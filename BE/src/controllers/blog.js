import cloudinary from "../config/cloudinary";
import Blog from "../models/blog";
import fs from "fs";

// Tạo bài viết mới
export const createBlog = async (req, res) => {
  try {
    console.log("Files received on backend:", req.files);
    const { content, title, category, author, description } = req.body;
    const image = req.files?.image || req.file;

    console.log(req.body);

    // Log thông tin về ảnh
    if (image) {
      console.log("Image received:", image);
    } else {
      console.log("No image received.");
    }

    // Kiểm tra các trường bắt buộc
    if (!title || !category || !author || !description || !content) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Upload ảnh lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: "blogs",
      resource_type: "auto",
    });

    // Sau khi upload xong, xóa file tạm trên server
    fs.unlink(image.path, (err) => {
      if (err) {
        console.error("Lỗi khi xóa file tạm:", err);
      } else {
        console.log("Xóa file tạm thành công:", image.path);
      }
    });

    // Kiểm tra nếu content có chứa ảnh và upload ảnh lên Cloudinary
    const imageUrls = [];
    const imageRegex = /<img.*?src=["'](.*?)["']/g; // Regex để tìm tất cả các URL hình ảnh trong nội dung
    let match;
    let imageIndex = 0; // Số thứ tự ảnh
    while ((match = imageRegex.exec(content)) !== null) {
      const imageUrl = match[1]; // Lấy URL ảnh từ nội dung

      if (imageUrl) {
        // Tải ảnh lên Cloudinary nếu URL là ảnh ngoài (không phải Cloudinary)
        if (!imageUrl.startsWith("http")) {
          try {
            const uploadResultContentImage = await cloudinary.uploader.upload(
              imageUrl,
              {
                folder: "blogs",
                resource_type: "auto", // Để tự động xác định loại tài nguyên (ảnh, video, v.v.)
              }
            );

            // Lưu URL của ảnh đã upload
            imageUrls.push(uploadResultContentImage.secure_url);
          } catch (error) {
            console.error("Lỗi khi tải ảnh từ URL trong content:", error);
          }
        } else {
          // Nếu ảnh là một URL Cloudinary (hoặc đã là URL hợp lệ), bỏ qua
          imageUrls.push(imageUrl);
        }
      }
    }

    // Thay thế các URL hình ảnh cũ bằng các URL từ Cloudinary trong content
    let updatedContent = content;
    imageUrls.forEach((url, index) => {
      updatedContent = updatedContent.replace(imageRegex, (match) => {
        // Chỉ thay thế src của ảnh thứ index (chính xác hơn)
        if (index === imageIndex++) {
          return match.replace(/src=["'](.*?)["']/, `src="${url}"`);
        }
        return match;
      });
    });

    // Tạo bài viết mới với nội dung đã thay thế URL ảnh
    const newBlog = new Blog({
      title,
      category,
      author,
      description,
      content: updatedContent, // Dùng content đã thay thế ảnh
      image: uploadResult.secure_url,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Lỗi khi lưu bài viết:", error);
    res.status(500).json({ message: "Lỗi khi tạo bài viết", error });
  }
};

// Lấy tất cả bài viết (không phân trang)
export const getBlogs = async (req, res) => {
  try {

    const { category } = req.query; // Lấy danh mục từ query string

    // Nếu có category, lọc theo category, nếu không, lấy tất cả bài viết
    const filter = category ? { category } : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Lỗi khi lấy bài viết", error });
  }
};

// Lấy bài viết theo ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Lỗi khi lấy bài viết", error });
  }
};

// Cập nhật bài viết
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title, category, author, description } = req.body;
    const image = req.files?.image || req.file;


    // Kiểm tra các trường bắt buộc
    if (!title || !category || !author || !description || !content) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Tìm bài viết hiện tại
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    // Nếu có ảnh mới, upload lên Cloudinary
    let imageUrl = existingBlog.image; // Giữ ảnh cũ nếu không có ảnh mới
    if (image) {
      // Nếu có ảnh mới, upload và lấy URL
      const uploadResult = await cloudinary.uploader.upload(image.path, {
        folder: "blogs",
        resource_type: "auto",
      });
      fs.unlink(image.path, (err) => {
        if (err) {
          console.error("Lỗi khi xóa file tạm:", err);
        } else {
          console.log("Xóa file tạm thành công:", image.path);
        }
      });

      imageUrl = uploadResult.secure_url; // Cập nhật URL ảnh mới
    }

    // Xử lý nội dung nếu có ảnh trong nội dung cần upload
    const imageUrls = [];
    const imageRegex = /<img.*?src=["'](.*?)["']/g; // Regex để tìm tất cả các URL hình ảnh trong nội dung
    let match;
    let imageIndex = 0; // Biến đếm ảnh trong content
    while ((match = imageRegex.exec(content)) !== null) {
      const imageUrlInContent = match[1];
      if (imageUrlInContent && !imageUrlInContent.startsWith("http")) {
        // Nếu ảnh trong nội dung là URL không phải từ Cloudinary, cần upload
        try {
          const uploadResultContentImage = await cloudinary.uploader.upload(
            imageUrlInContent,
            {
              folder: "blogs", // Chỉ định thư mục trên Cloudinary
              resource_type: "auto", // Tự động xác định loại tài nguyên (ảnh, video, v.v.)
            }
          );
          imageUrls.push(uploadResultContentImage.secure_url); // Lưu URL của ảnh đã upload
        } catch (error) {
          console.error("Lỗi khi tải ảnh từ URL trong content:", error);
        }
      } else {
        // Nếu ảnh là URL hợp lệ, giữ lại URL đó
        imageUrls.push(imageUrlInContent);
      }
    }

    // Thay thế các URL hình ảnh cũ bằng các URL từ Cloudinary trong nội dung
    let updatedContent = content;
    imageUrls.forEach((url, index) => {
      updatedContent = updatedContent.replace(imageRegex, (match) => {
        // Chỉ thay thế src của ảnh thứ index (chính xác hơn)
        if (index === imageIndex++) {
          return match.replace(/src=["'](.*?)["']/, `src="${url}"`);
        }
        return match;
      });
    });

    // Cập nhật bài viết trong cơ sở dữ liệu
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        category,
        author,
        description,
        content: updatedContent, // Dùng content đã thay thế ảnh
        image: imageUrl, // Dùng ảnh mới nếu có
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật bài viết", error });
  }
};

// Xóa bài viết
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    res.status(500).json({ message: "Lỗi khi xóa bài viết", error });
  }
};

