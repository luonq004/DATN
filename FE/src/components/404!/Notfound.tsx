import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold text-center mt-5">404 - Không tìm thấy trang</h1>
      <p className="text-center mt-2">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
