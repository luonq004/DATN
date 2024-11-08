import Confirm from "@/components/Confirm/Confirm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(sliders.length / itemsPerPage);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sliders");
        setSliders(response.data);
      } catch (err) {
        setError("Failed to fetch sliders.");
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/sliders/${id}`);
      setSliders(sliders.filter((slider: any) => slider._id !== id));
      toast.success("Deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete slider.");
    }
  };

  const openConfirm = (id: string) => {
    setSelectedSliderId(id);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const confirmDelete = () => {
    if (selectedSliderId) {
      handleDelete(selectedSliderId);
      setIsConfirmOpen(false);
    }
  };

  // Tính toán các mục hiển thị cho trang hiện tại
  const indexOfLastSlider = currentPage * itemsPerPage;
  const indexOfFirstSlider = indexOfLastSlider - itemsPerPage;
  const currentSliders = sliders.slice(indexOfFirstSlider, indexOfLastSlider);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 mx-auto max-w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center sm:text-left">
          Danh Sách Slider
        </h2>
        <Link
          to="/dashboard/sliders/add"
          className="flex items-center gap-2 sm:w-auto bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-600 shadow-lg transition duration-200 mt-4 sm:mt-0 sm:ml-auto "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Thêm Slider
        </Link>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 uppercase">
                    #
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 uppercase">
                    TIÊU ĐỀ
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 uppercase">
                    MÔ TẢ
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 uppercase">
                    HÌNH ẢNH
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 uppercase">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSliders.map((slider: any, index) => (
                  <tr
                    key={slider._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700">
                      {index + 1 + indexOfFirstSlider}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 max-w-[100px] md:max-w-xs break-words">
                      {slider.title}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 max-w-[100px] md:max-w-xs break-words">
                      {slider.description}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <img
                        src={slider.image}
                        alt={slider.title}
                        className="w-24 h-16 md:w-40  object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <div className="flex space-x-1 md:space-x-2">
                        <Link
                          to={`/dashboard/sliders/edit/${slider._id}`}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 md:w-5 md:h-5"
                          >
                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => openConfirm(slider._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 md:w-5 md:h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="my-4 flex justify-center md:justify-end">
            <Pagination>
              <PaginationPrevious
                className=" cursor-pointer"   
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`cursor-pointer ${
                      index + 1 === currentPage ? "bg-zinc-400 " : ""
                    }`}
                  >
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
              <PaginationEllipsis />
              <PaginationNext
                className=" cursor-pointer"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </Pagination>
          </div>

          <Confirm
            isOpen={isConfirmOpen}
            onClose={closeConfirm}
            onConfirm={confirmDelete}
            title="Xác nhận xóa"
            message={`Bạn có chắc chắn muốn xóa slider này? Hành động này không thể hoàn tác.`}
          />
        </div>
      )}
    </div>
  );
};

export default ListSlider;
