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

    // Kiểm tra trạng thái xóa  trên Clerk
    const isDeletedOnClerk = clerkUser.privateMetadata?.isDeleted || false;

    if (isDeletedOnClerk) {
      return res.status(403).json({
        message:
          "Người dùng đã bị xóa . Vui lòng khôi phục tài khoản trước khi thực hiện thao tác này.",
      });
    }

    // Kiểm tra trạng thái bị ban
    const isBanned = clerkUser.privateMetadata?.isBanned || false;

    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await Users.findOne({ clerkId });

    // Xác định vai trò cho người dùng
    const role = existingUser
      ? existingUser.role
      : clerkUser.publicMetadata?.role ||
        (await Users.countDocuments()) === 0
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
    let imageUrl = clerkUser.imageUrl;

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

export const createUser = async (req, res) => {
  try {
    const { emailAddress, firstName, lastName, password, role, imageUrl } =
      req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!emailAddress || !firstName || !lastName || !password) {
      return res.status(400).json({
        message:
          "Thiếu thông tin bắt buộc (email, firstName, lastName, password)",
      });
    }

    try {
      // Tạo người dùng trên Clerk
      const clerkUser = await clerkClient.users.createUser({
        emailAddress: [emailAddress],
        firstName,
        lastName,
        password,
        publicMetadata: {
          role: role || "User", // Default role là "User"
        },
      });

      // Lưu thông tin người dùng vào MongoDB
      const newUser = new Users({
        clerkId: clerkUser.id,
        email: emailAddress,
        firstName,
        lastName,
        role: role || "User",
        imageUrl: imageUrl || clerkUser.imageUrl,
      });

      await newUser.save();

      // Trả về phản hồi thành công
      return res.status(201).json({
        message: "Người dùng đã được tạo thành công!",
        user: newUser,
      });
    } catch (error) {
      // Xử lý lỗi từ Clerk API
      if (error.errors) {
        const clerkErrors = error.errors.map((err) => ({
          code: err.code,
          message: err.message,
        }));

        return res.status(422).json({
          message: "Lỗi khi tạo người dùng",
          errors: clerkErrors,
        });
      }

      throw error; // Nếu không phải lỗi từ Clerk, ném lỗi để xử lý tiếp
    }
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);

    // Trả lỗi không xác định
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi tạo người dùng",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { includeDeleted = "false" } = req.query;

    // Chuyển includeDeleted thành boolean
    const includeDeletedFlag = includeDeleted === "true";

    // Tạo bộ lọc dữ liệu
    const filter = includeDeletedFlag
      ? { isDeleted: true }
      : { isDeleted: false };

    // Truy vấn tất cả người dùng
    const users = await Users.find(filter);

    const validUsers = [];

    // Lọc người dùng thông qua Clerk
    for (const user of users) {
      try {
        const clerkUser = await clerkClient.users.getUser(user.clerkId);

        // Nếu người dùng tồn tại trên Clerk, thêm vào danh sách hợp lệ
        if (clerkUser) {
          validUsers.push(user);
        }
      } catch (error) {
        console.warn(
          `Người dùng với ID ${user.clerkId} không tồn tại trên Clerk. Đang xóa khỏi MongoDB...`
        );
        // Xóa khỏi MongoDB nếu Clerk không tìm thấy người dùng
        await Users.deleteOne({ clerkId: user.clerkId });
      }
    }

    // Trả về dữ liệu
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
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
        isDeleted: clerkUser.privateMetadata?.isDeleted || false,
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

export const softDeleteUser = async (req, res) => {
  const { clerkId } = req.params;

  try {
    // Cập nhật trạng thái trong MongoDB
    const user = await Users.findOneAndUpdate(
      { clerkId },
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật trạng thái xóa mềm trong Clerk
    try {
      await clerkClient.users.updateUser(clerkId, {
        privateMetadata: { isDeleted: true },
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái trên Clerk:", error);
      return res.status(500).json({
        message: "Đã cập nhật người dùng trong MongoDB nhưng lỗi trên Clerk",
      });
    }

    res.status(200).json({
      message: "Xóa thành công trên cả Clerk và MongoDB",
      user,
    });
  } catch (error) {
    console.error("Lỗi khi xóa mềm người dùng:", error);
    res.status(500).json({ message: "Lỗi khi xóa mềm người dùng" });
  }
};

export const restoreUser = async (req, res) => {
  const { clerkId } = req.params;

  try {
    //  Cập nhật trạng thái trong MongoDB
    const user = await Users.findOneAndUpdate(
      { clerkId },
      { isDeleted: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    //  Cập nhật trạng thái phục hồi trong Clerk
    try {
      await clerkClient.users.updateUser(clerkId, {
        privateMetadata: { isDeleted: false },
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái trên Clerk:", error);
      return res.status(500).json({
        message: "Đã phục hồi người dùng trong MongoDB nhưng lỗi trên Clerk",
      });
    }

    res.status(200).json({
      message: "Người dùng đã được phục hồi trên cả Clerk và MongoDB",
      user,
    });
  } catch (error) {
    console.error("Lỗi khi phục hồi người dùng:", error);
    res.status(500).json({ message: "Lỗi khi phục hồi người dùng" });
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
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng trên Clerk.",
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

export const checkUserStatus = async (req, res) => {
  const { clerkId } = req.params;

  try {
    // Lấy thông tin người dùng từ Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    if (!clerkUser) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại trên Clerk" });
    }

    // Kiểm tra trạng thái bị ban và xóa mềm
    const isBanned = clerkUser.privateMetadata?.isBanned || false;
    const isDeleted = clerkUser.privateMetadata?.isDeleted || false;

    // Lấy thông tin từ MongoDB để đảm bảo đồng bộ
    const mongoUser = await Users.findOne({ clerkId });

    if (!mongoUser) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại trong MongoDB" });
    }

    res.status(200).json({
      isBanned,
      isDeleted,
      mongoDB: {
        isDeleted: mongoUser.isDeleted,
        isBanned: mongoUser.isBanned,
      },
    });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái người dùng:", error);
    res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
  }
};
