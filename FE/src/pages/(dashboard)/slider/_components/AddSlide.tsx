import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSlider = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Khai báo trạng thái để lưu thông tin lỗi của form
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

    // Xác thực các trường đầu vào
    const errors = {
      title: title ? "" : "Title is required",
      description: description ? "" : "Description is required",
      image: image ? "" : "Image is required",
    };
    setFormErrors(errors);

    // Nếu có lỗi, dừng lại và không gửi form
    if (errors.title || errors.description || errors.image) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Gửi yêu cầu POST đến API để tạo slide mới
      const response = await axios.post(
        "http://localhost:8080/api/sliders",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Thành công!");
      navigate("/dashboard/sliders");
      console.log("Slide added:", response.data);
    } catch (err) {
      setError("Failed to add slide. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi tệp khi người dùng chọn ảnh
  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null; // Lấy tệp đã chọn
    setImage(file); // Cập nhật trạng thái ảnh

    // Nếu có tệp, đọc tệp để xem trước
    if (file) {
      const reader = new FileReader(); // Tạo đối tượng FileReader
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Cập nhật trạng thái xem trước ảnh
      };
      reader.readAsDataURL(file); // Đọc tệp như URL dữ liệu
    }
  };

  return (
    <div className="px-20 mx-auto p-4 sm:p-6 md:p-8 ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        Tạo Mới Slide
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-200 rounded">
            {error}
          </div>
        )}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 text-base sm:text-lg"
          >
            Tiêu Đề
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-2 p-2 sm:p-3 w-full border ${
              formErrors.title ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            required
          />
          {formErrors.title && (
            <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
          )}
        </div>
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-base sm:text-lg"
          >
            Mô Tả
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-2 p-2 sm:p-3 w-full border ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            rows={4}
            required
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.description}
            </p>
          )}
        </div>
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="image"
            className="block text-gray-700 text-base sm:text-lg"
          >
            Ảnh Slide
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className={`mt-2 border ${
              formErrors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
            required
          />
          {formErrors.image && (
            <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
          )}
        </div>
        {imagePreview && (
          <div className="my-4 sm:mb-6">
            <p className="text-gray-700">Xem Trước Ảnh Được Thêm:</p>
            <img
              src={imagePreview}
              alt="Selected"
              className="mt-2 w-48 h-48 sm:w-64 sm:h-64 object-contain mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className=" bg-blue-500 mt-6 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out "
        >
          {loading ? "Đang Tạo..." : "Tạo Slide"}
        </button>
      </form>
    </div>
  );
};

export default AddSlider;
