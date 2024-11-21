import Confirm from "@/components/Confirm/Confirm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filterType, setFilterType] = useState("all"); // Bộ lọc loại slide
  const totalPages = Math.ceil(sliders.length / itemsPerPage);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const { toast } = useToast();

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/sliders${
            filterType !== "all" ? `?type=${filterType}` : ""
          }`
        );
        setSliders(response.data);
      } catch (err) {
        setError("Failed to fetch sliders.");
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [filterType]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/sliders/${id}`);
      setSliders(sliders.filter((slider: any) => slider._id !== id));
      toast({
        title: "Thành công",
        description: "Slide đã được xóa thành công!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Thất bại",
        description: "Có lỗi sảy ra khi xóa slide!",
      });
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

  const indexOfLastSlider = currentPage * itemsPerPage;
  const indexOfFirstSlider = indexOfLastSlider - itemsPerPage;
  const currentSliders = sliders.slice(indexOfFirstSlider, indexOfLastSlider);

  // Hàm toggle trạng thái mở rộng
  const toggleRowExpansion = (id: any) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Thu gọn nếu đã mở rộng
      } else {
        newSet.add(id); // Mở rộng nếu đang thu gọn
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 mx-auto max-w-full ">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-4">
        <h2 className="text-3xl text-center font-semibold mb-10 sm:mb-0">
          Danh Sách Slider
        </h2>
        <div className="flex justify-between items-center gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">Tất cả</option>
            <option value="homepage">Homepage</option>
            <option value="product">Product</option>
          </select>
          <Link
            to="/admin/sliders/add"
            className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Thêm Slider
          </Link>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold border">#</th>
                <th className="px-4 py-2 text-left font-semibold border">
                  Tiêu Đề
                </th>
                <th className="px-4 py-2 text-left font-semibold border">
                  Loại slide
                </th>
                <th className="px-4 py-2 text-left font-semibold border">
                  Ảnh chính
                </th>
                <th className="px-4 py-2 text-left font-semibold border">
                  Ảnh nền
                </th>
                {filterType === "homepage" && (
                  <>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Phụ Đề
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Mô Tả
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Tính Năng
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Giá
                    </th>
                  </>
                )}
                {filterType === "product" && (
                  <>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Tiêu đề nổi
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border">
                      Text % sale
                    </th>
                  </>
                )}
                <th className="px-4 py-2 text-left font-semibold border">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSliders.map((slider: any, index) => (
                <tr key={slider._id} className="hover:bg-gray-50">
                  <td className="px-2 py-2">
                    {index + 1 + indexOfFirstSlider}
                  </td>
                  <td className="px-2 py-2 border">
                    <div>
                      <p
                        className={`${
                          expandedRows.has(slider._id) ? "" : " line-clamp-4"
                        }`}
                      >
                        {slider.title || "Không có"}
                      </p>
                      {slider.title?.length > 50 && (
                        <button
                          className="text-blue-500 text-sm mt-1"
                          onClick={() => toggleRowExpansion(slider._id)}
                        >
                          {expandedRows.has(slider._id)
                            ? "Thu gọn"
                            : "Xem thêm"}
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="px-2 py-2 border capitalize">{slider.type}</td>
                  <td className="px-2 py-2 border">
                    {slider.image ? (
                      <img
                        src={slider.image}
                        alt="Hình ảnh"
                        className="w-52 mx-auto object-contain h-20"
                      />
                    ) : (
                      "Không có"
                    )}
                  </td>
                  <td className="px-2 py-2 border">
                    {slider.backgroundImage ? (
                      <img
                        src={slider.backgroundImage}
                        alt="Ảnh nền"
                        className="w-52 mx-auto object-contain h-20"
                      />
                    ) : (
                      "Không có"
                    )}
                  </td>
                  {filterType === "homepage" && slider.type === "homepage" && (
                    <>
                      <td className="px-2 py-2 border">
                        <div>
                          <p
                            className={`${
                              expandedRows.has(slider._id) ? "" : "line-clamp-3"
                            }`}
                          >
                            {slider.subtitle || "Không có"}
                          </p>
                          {slider.subtitle?.length > 50 && (
                            <button
                              className="text-blue-500 text-sm mt-1"
                              onClick={() => toggleRowExpansion(slider._id)}
                            >
                              {expandedRows.has(slider._id)
                                ? "Thu gọn"
                                : "Xem thêm"}
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-2 py-2 border">
                        <div>
                          <p
                            className={`${
                              expandedRows.has(slider._id) ? "" : "line-clamp-3"
                            }`}
                          >
                            {slider.description || "Không có"}
                          </p>
                          {slider.description?.length > 110 && (
                            <button
                              className="text-blue-500 text-sm mt-1"
                              onClick={() => toggleRowExpansion(slider._id)}
                            >
                              {expandedRows.has(slider._id)
                                ? "Thu gọn"
                                : "Xem thêm"}
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-2 py-2 border">
                        <div>
                          <p
                            className={`${
                              expandedRows.has(slider._id) ? "" : "line-clamp-3"
                            }`}
                          >
                            {slider.features?.length
                              ? slider.features.join(", ")
                              : "Không có"}
                          </p>
                          {slider.features?.length > 2 && (
                            <button
                              className="text-blue-500 text-sm mt-1"
                              onClick={() => toggleRowExpansion(slider._id)}
                            >
                              {expandedRows.has(slider._id)
                                ? "Thu gọn"
                                : "Xem thêm"}
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-2 py-2 border">
                        <span>
                          {slider.price?.toLocaleString("vi-VN") || "Không có"}{" "}
                          VNĐ
                        </span>
                      </td>
                    </>
                  )}
                  {filterType === "product" && slider.type === "product" && (
                    <>
                      <td className="px-2 py-2 border">
                        {slider.promotionText || "Không có"}
                      </td>
                      <td className="px-2 py-2 border">
                        {slider.textsale || "Không có"}
                      </td>
                    </>
                  )}
                  <td className="px-2 py-2 border">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/sliders/edit/${slider._id}`}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => openConfirm(slider._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
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

          <Confirm
            isOpen={isConfirmOpen}
            onClose={closeConfirm}
            onConfirm={confirmDelete}
            title="Xác nhận xóa"
            message="Bạn có chắc chắn muốn xóa slider này?"
          />
        </div>
      )}
      <div className="my-4 flex justify-center ">
        <Pagination className="gap-3">
          <PaginationPrevious
            className=" cursor-pointer"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${index + 1 === currentPage ? "border border-black rounded" : ""}`}
              >
                <PaginationLink>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            className=" cursor-pointer"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default ListSlider;
