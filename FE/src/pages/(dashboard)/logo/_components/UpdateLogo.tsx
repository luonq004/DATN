import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateLogoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logo, setLogo] = useState<{ title: string; image: string } | null>(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/logo/${id}`);
        setLogo(response.data);
        setTitle(response.data.title);
        setPreview(response.data.image);
      } catch (error) {
        toast({
        variant: "destructive",
        title: "Thất bại",
        description: "Có lỗi sảy ra khi lấy thông tin logo!",
      });
      }
    };

    fetchLogo();
  }, [id]);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
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
      await axios.put(`http://localhost:8080/api/logo/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Thành công",
        description: "Logo đã được cập nhật thành công!",
      });
      navigate("/admin/logos");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Thất bại",
        description: "Có lỗi sảy ra khi cập nhật logo!",
      });
    }finally{
      setLoading(false); 
    }
  };

  if (!logo) return <div>Đang tải...</div>;

  return (
    <div className="md:px-20 mx-auto p-6">
  <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cập Nhật Logo</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-6">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Tiêu Đề
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
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
        Hình Ảnh Logo
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 block w-full mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Hình Ảnh Hiện Tại</label>
      {preview && (
        <div className="mt-2 w-full flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-52 h-32 object-contain rounded-md shadow-sm"
          />
        </div>
      )}
    </div>
    <button
      type="submit"
      className={` bg-blue-500 mt-5 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-sm transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Đang Cập Nhật...' : 'Cập Nhật Logo'}
    </button>
  </form>
</div>

  );
};

export default UpdateLogoPage;
