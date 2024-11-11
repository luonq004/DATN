import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSlider = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Kiểm tra nếu không có id trong URL
    if (!id) {
      setError("ID bị thiếu trong URL.");
      return;
    }

    const fetchSlider = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/sliders/${id}`);
        const { title, description, image } = response.data;
        setTitle(title);
        setDescription(description);
        setImagePreview(image);
      } catch (err) {
        setError("Failed to fetch slider data.");
      }
    };

    fetchSlider();
  }, [id]);

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Tạo đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:8080/api/sliders/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cập nhật slide thành công!");
      navigate("/dashboard/sliders");
    } catch (err) {
      setError("Có lỗi sảy ra khi cập nhâtj slide.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi tệp khi người dùng chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-20 mx-auto p-8">
  <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cập Nhật Slide</h2>
  {error && <p className="text-red-500">{error}</p>}
  <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="mb-6">
      <label htmlFor="title" className="block text-gray-700 text-lg">Tiêu Đề</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
    <div className="mb-6">
      <label htmlFor="description" className="block text-gray-700 text-lg">Mô Tả</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      />
    </div>
    <div className="mb-6">
      <label htmlFor="image" className="block text-gray-700 text-lg">Ảnh Slide</label>
      <input
        type="file"
        id="image"
        onChange={handleFileChange}
        className="mt-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    {imagePreview && (
      <div className="mb-6">
        <p className="text-gray-700">Ảnh Hiện Tại:</p>
        <img
          src={imagePreview}
          alt="Selected"
          className="mt-2 w-full h-auto max-w-md mx-auto object-contain rounded-lg shadow-md" 
        />
      </div>
    )}
    <button
      type="submit"
      disabled={loading}
      className="mt-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out "
    >
      {loading ? "Đang cập nhật..." : "Cập nhật slide"}
    </button>
  </form>
</div>

  );
};

export default UpdateSlider;
