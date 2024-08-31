
import dotenv from "dotenv";
import Users from "../models/user.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();

export const saveUser = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).send("Invalid clerkId: clerkId is required");
    }

    // Lấy thông tin người dùng từ Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await Users.findOne({ clerkId });

    // Xác định vai trò cho người dùng
    let role;
    if (existingUser) {
      role = existingUser.role; // Dùng vai trò hiện tại nếu đã tồn tại
    } else {
      const userCount = await Users.countDocuments();
      role = userCount === 0 ? "admin" : "member";
    }

    // Cập nhật metadata trên Clerk
    await clerkClient.users.updateUser(clerkId, {
      publicMetadata: {
        role: role,
      },
    });

    // Cập nhật hoặc tạo người dùng mới trong cơ sở dữ liệu
    const user = await Users.findOneAndUpdate(
      { clerkId },
      {
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        role: role,  // Đảm bảo vai trò được lưu đúng
      },
      { upsert: true, new: true }
    );

    res.status(200).send("User saved or updated successfully");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user: " + error.message);
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
    return res.status(500).json({ message: error.message });
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

    // Lấy thông tin người dùng thông qua clerkId  từ MongoDB
    const user = await Users.findOne({ clerkId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại trong cơ sở dữ liệu" });
    }

    // Cập nhật thông tin người dùng trong Clerk
    await clerkClient.users.updateUser(clerkId, {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      emailAddress: updateData.email,
    });

    // Cập nhật thông tin người dùng trong MongoDB
    const updatedUser = await Users.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error during user update:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật người dùng" });
  }
};
