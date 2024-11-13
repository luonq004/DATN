import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import Users from "../models/users";
import clerkClient from "../config/clerk";
import cloudinary from "../config/cloudinary";
import fs from "fs";

dotenv.config();

export const saveUser = async (req, res) => {
  try {
    const { clerkId, phone, gender, birthdate, address, paymentInfo, orders } =
      req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!clerkId) {
      return res
        .status(400)
        .send("ID người dùng không hợp lệ: clerkId là bắt buộc");
    }

    // Lấy thông tin người dùng từ Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Kiểm tra trạng thái bị ban
    const isBanned = clerkUser.privateMetadata?.isBanned || false;

    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await Users.findOne({ clerkId });

    // Xác định vai trò cho người dùng
    const role = existingUser
      ? existingUser.role
      : (await Users.countDocuments()) === 0
      ? "Admin"
      : "User";

    // Cập nhật metadata trên Clerk
    await clerkClient.users.updateUser(clerkId, {
      publicMetadata: {
        role,
        phone,
        gender,
        birthdate,
      },
    });

    // Xử lý ảnh người dùng (nếu có file hình ảnh được upload)
    let imageUrl = clerkUser.imageUrl; // Mặc định giữ nguyên URL ảnh cũ
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });
      imageUrl = uploadResponse.secure_url;

      // Xóa file tạm
      fs.unlinkSync(req.file.path);
    }

    // Cập nhật hoặc tạo người dùng mới trong cơ sở dữ liệu
    const user = await Users.findOneAndUpdate(
      { clerkId },
      {
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl,
        role,
        phone,
        gender,
        birthdate,
        address,
        paymentInfo,
        orders: orders || [],
        isBanned,
      },
      { upsert: true, new: true }
    );

    res.status(200).send({
      message: "Người dùng đã được lưu hoặc cập nhật thành công",
      user,
    });
  } catch (error) {
    console.error("Lỗi khi lưu người dùng:", error);
    res.status(500).send("Lỗi khi lưu người dùng: " + error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    if (!users.length) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả người dùng:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res
        .status(400)
        .send("ID người dùng không hợp lệ: clerkId là bắt buộc");
    }

    // Lấy người dùng từ cơ sở dữ liệu
    const user = await Users.findOne({ clerkId });

    if (!user) {
      return res
        .status(404)
        .send("Không tìm thấy người dùng trong cơ sở dữ liệu");
    }

    // Lấy thông tin chi tiết người dùng từ Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    if (!clerkUser) {
      return res.status(404).send("Không tìm thấy người dùng trong Clerk");
    }

    // Kết hợp dữ liệu từ cơ sở dữ liệu và Clerk
    const userDetails = {
      ...user.toObject(),
      clerkData: {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
        role: clerkUser.publicMetadata.role,
        phone: clerkUser.publicMetadata.phone,
        gender: clerkUser.publicMetadata.gender,
        birthdate: clerkUser.publicMetadata.birthdate,
        isBanned: clerkUser.privateMetadata?.isBanned || false,
      },
    };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return res
      .status(500)
      .send("Lỗi khi lấy thông tin người dùng: " + error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res
        .status(400)
        .send("ID người dùng không hợp lệ: clerkId là bắt buộc");
    }

    // Xóa người dùng khỏi MongoDB
    const user = await Users.findOneAndDelete({ clerkId });

    if (!user) {
      return res
        .status(404)
        .send("Không tìm thấy người dùng trong cơ sở dữ liệu");
    }

    // Xóa người dùng khỏi Clerk
    try {
      await clerkClient.users.deleteUser(clerkId);
    } catch (clerkError) {
      console.error("Lỗi khi xóa người dùng từ Clerk:", clerkError);
      return res.status(500).send("Lỗi khi xóa người dùng từ Clerk");
    }

    res.status(200).send("Xóa người dùng thành công từ MongoDB và Clerk");
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).send("Lỗi khi xóa người dùng: " + error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updateData = req.body;

    // Kiểm tra nếu không có clerkId
    if (!clerkId) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ." });
    }

    // Kiểm tra người dùng tồn tại trong MongoDB
    const user = await Users.findOne({ clerkId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại trong cơ sở dữ liệu" });
    }

    let imageUrl = updateData.imageUrl;

    // Kiểm tra nếu có file hình ảnh mới được tải lên
    if (req.file) {
      console.log("File upload: ", req.file);

      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });

      console.log("Upload response: ", uploadResponse);

      // Kiểm tra nếu quá trình upload lên Cloudinary thành công
      if (uploadResponse && uploadResponse.secure_url) {
        imageUrl = uploadResponse.secure_url;
      } else {
        return res
          .status(500)
          .json({ message: "Không thể lấy URL ảnh từ Cloudinary." });
      }

      console.log("URL ảnh mới từ Cloudinary:", imageUrl);
    }

    // Cập nhật thông tin người dùng trên Clerk
    try {
      const clerkResponse = await clerkClient.users.updateUser(clerkId, {
        imageUrl: imageUrl,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        emailAddress: updateData.email,
        publicMetadata: {
          phone: updateData.phone,
          gender: updateData.gender,
          birthdate: updateData.birthdate,
        },
      });

      // Kiểm tra phản hồi từ Clerk
      if (clerkResponse.imageUrl !== imageUrl) {
        console.error(
          "Ảnh không được cập nhật trên Clerk. Vui lòng kiểm tra lại."
        );
      } else {
        console.log("Ảnh đã được cập nhật thành công trên Clerk.");
      }

      console.log("Clerk update response: ", clerkResponse);
    } catch (clerkError) {
      console.error(
        "Lỗi khi cập nhật thông tin người dùng trên Clerk:",
        clerkError
      );
      return res
        .status(500)
        .json({
          message:
            "Đã xảy ra lỗi khi cập nhật thông tin người dùng trên Clerk.",
        });
    }

    // Cập nhật thông tin người dùng trong MongoDB
    const updatedUser = await Users.updateOne(
      { clerkId },
      { ...updateData, imageUrl },
      { new: true }
    );

    console.log("Updated user in MongoDB: ", updatedUser);

    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật người dùng",
      error: error.message,
    });
  }
};

export const banUser = async (req, res) => {
  const { clerkId } = req.params;
  try {
    // Cập nhật trạng thái ban trên Clerk
    await clerkClient.users.updateUser(clerkId, {
      privateMetadata: { isBanned: true },
    });

    // Tìm user trong MongoDB bằng clerkId và cập nhật trạng thái
    const user = await Users.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    user.isBanned = true;
    await user.save();

    res.status(200).json({ message: "User đã bị ban thành công" });
  } catch (error) {
    console.error("Lỗi khi ban user:", error);
    res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
  }
};

// Unban user
export const unbanUser = async (req, res) => {
  const { clerkId } = req.params;
  try {
    // Cập nhật trạng thái ban trên Clerk
    await clerkClient.users.updateUser(clerkId, {
      privateMetadata: { isBanned: false },
    });

    // Tìm user trong MongoDB bằng clerkId và cập nhật trạng thái
    const user = await Users.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    user.isBanned = false;
    await user.save();

    res.status(200).json({ message: "User đã được bỏ ban thành công" });
  } catch (error) {
    console.error("Lỗi khi bỏ ban user:", error);
    res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
  }
};

export const checkBanStatus = async (req, res) => {
  const { clerkId } = req.params;
  try {
    // Lấy thông tin người dùng từ Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Kiểm tra trạng thái bị ban
    const isBanned = clerkUser.privateMetadata?.isBanned || false;

    res.status(200).json({ isBanned });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái ban:", error);
    res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
  }
};
