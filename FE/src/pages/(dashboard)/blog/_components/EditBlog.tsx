import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Blog } from "@/common/types/Blog";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { categories } from "./Categories";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Blog>();
  const [value, setValueEditor] = useState(""); // Lưu giá trị editor của React Quill
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Lưu ảnh xem trước
  const [imageFile, setImageFile] = useState<File | null>(null); // Lưu file ảnh
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Lấy thông tin bài viết từ backend khi trang load
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs/${id}`
        );
        const blog = response.data;

        // Cập nhật giá trị vào form
        setValue("title", blog.title);
        setValue("category", blog.category);
        setValue("author", blog.author);
        setValue("description", blog.description);
        setValue("content", blog.content);
        setPreviewImage(blog.image);
        setValueEditor(blog.content);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải thông tin bài viết.",
        });
      }
    };
    fetchBlog();
  }, [id, setValue, toast]);

  // Hàm xử lý thay đổi nội dung của React Quill
  const handleChange = (content: string) => {
    setValueEditor(content); // Cập nhật giá trị cho editor
    setValue("content", content); // Lưu vào React Hook Form
  };

  // Hàm xử lý khi chọn file ảnh
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Lưu file vào state
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Hiển thị ảnh xem trước
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng base64
    }
  };

  // Hàm xử lý submit form
  const onSubmit = async (data: Blog) => {
    if (!imageFile && !previewImage) {
      alert("Vui lòng chọn một ảnh!");
      return;
    }

    setLoading(true);
    try {
      // Tạo FormData để gửi yêu cầu PUT
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("description", data.description);
      formData.append("content", data.content);

      // Nếu có ảnh mới, thêm vào formData
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Gửi yêu cầu PUT lên BE
      const response = await axios.put(
        `http://localhost:8080/api/blogs/${id}`,
        formData
      );

      console.log("Bài viết đã được cập nhật:", response.data);
      toast({
        title: "Thành công",
        description: "Bài viết đã được cập nhật thành công!",
      });
      navigate("/admin/blogs"); // Quay lại trang danh sách
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      toast({
        variant: "destructive",
        title: "Thất bại",
        description: "Có lỗi sảy ra khi cập nhật bài viết!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Tiêu đề */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Tiêu đề
          </label>
          <input
            {...register("title", {
              required: "Tiêu đề là bắt buộc",
              minLength: {
                value: 3,
                message: "Tiêu đề phải có ít nhất 3 ký tự",
              },
            })}
            id="title"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Danh mục */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium mb-2">
            Danh mục
          </label>
          <select
            {...register("category", { required: "Danh mục là bắt buộc" })}
            id="category"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Chọn danh mục
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>

        {/* Tác giả */}
        <div>
          <label htmlFor="author" className="block text-lg font-medium mb-2">
            Tác giả
          </label>
          <input
            {...register("author", { required: "Tác giả là bắt buộc" })}
            id="author"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.author && (
            <span className="text-red-500">{errors.author.message}</span>
          )}
        </div>

        {/* Hình ảnh */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Chọn ảnh
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          {/* Hiển thị ảnh xem trước */}
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Mô tả */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Mô tả
          </label>
          <textarea
            {...register("description", { required: "Mô tả là bắt buộc" })}
            id="description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        {/* Nội dung (React Quill Editor) */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Nội dung
          </label>
          <ReactQuill
            theme="snow"
            value={value} // Giá trị nội dung được truyền vào ReactQuill
            onChange={handleChange} // Xử lý thay đổi nội dung
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>

        {/* Nút Submit */}
        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;