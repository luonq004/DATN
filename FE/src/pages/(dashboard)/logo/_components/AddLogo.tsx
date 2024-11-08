import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLogoPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true)
      await axios.post("http://localhost:8080/api/logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Logo added successfully!");
      navigate("/dashboard/logos");
    } catch (error) {
      toast.error("Failed to add logo.");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="px-20 mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Thêm Mới Logo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Tiêu Đề:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Hình Ảnh Logo:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {preview && (
          <div className="my-6">
            <label className="block text-sm font-medium text-gray-700">
              Xem Trước Ảnh Được Thêm: 
            </label>
            <div className="mt-2 w-full flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-52 h-32 object-contain rounded-md shadow-sm"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className={` bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600 shadow-sm transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Đang Thêm...' : 'Thêm Logo'}
        </button>
      </form>
    </div>
  );
};

export default AddLogoPage;
