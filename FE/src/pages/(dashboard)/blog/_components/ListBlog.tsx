import { Blog } from "@/common/types/Blog";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "./Categories";
import Confirm from "@/components/Confirm/Confirm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [Delete, setToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); 
  const totalPages = Math.ceil(blogs.length / itemsPerPage); 
  const { toast } = useToast();

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi lấy dữ liệu bài viết");
        setLoading(false);
      });
  }, []);

  const openConfirmDeleteDialog = (id: string, title: string) => {
    setToDelete({ id, title });
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteDialog = () => {
    setIsConfirmDeleteOpen(false);
    setToDelete(null);
  };

  const handleDelete = async (blogId: string): Promise<void> => {
    try {
      // Gửi yêu cầu xóa bài viết
      const response = await fetch(
        `http://localhost:8080/api/blogs/${blogId}`,
        {
          method: "DELETE",
        }
      );

      // Kiểm tra xem phản hồi có phải là lỗi hay không
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi xóa bài viết");
      }

      // Xử lý dữ liệu thành công
      await response.json();
      toast({
        title: "Xóa thành công",
        description: "Bài viết đã được xóa thành công",
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      // Xử lý lỗi, bao gồm lỗi của fetch hoặc bất kỳ lỗi nào khác
      toast({
        variant: "destructive",
        title: "Lỗi khi xóa bài viết",
        description:
          error instanceof Error ? error.message : "Có lỗi không xác định",
      });
      console.error("Error when deleting blog:", error);
    } finally {
      setIsConfirmDeleteOpen(false);
      setToDelete(null);
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find((cat) => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

   // Chia các bài viết thành các trang
   const indexOfLastBlog = currentPage * itemsPerPage;
   const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  if (loading)
    return (
      <div className="text-center text-xl text-gray-600">
        Đang tải bài viết...
      </div>
    );
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Danh sách bài viết</h1>
        <Link
          to="/admin/blogs/add"
          className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-300"
        >
          Thêm bài viết
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Tiêu đề và Thông tin cơ bản */}
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>
                {blog.author} - {getCategoryLabel(blog.category)}
              </span>
            </div>

            {/* Hình ảnh bài viết */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-contain rounded-lg mb-4"
            />

            {/* Tóm tắt bài viết */}
            <p className="text-sm text-gray-700 mb-4">{blog.description}</p>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Link
                to={`/admin/blogs/edit/${blog._id}`}
                className="text-blue-500 hover:text-blue-600 transition duration-300"
              >
                Chỉnh sửa
              </Link>
              <button
                onClick={() => openConfirmDeleteDialog(blog._id, blog.title)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                Xóa
              </button>
            </div>

            {/* Toggle Collapse for Content */}
            <details className="mt-4 group-hover:block">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                Xem chi tiết
              </summary>
              <div
                className="detail text-gray-800 mt-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </details>
          </div>
        ))}
      </div>

      <Confirm
        isOpen={isConfirmDeleteOpen}
        onClose={closeConfirmDeleteDialog}
        onConfirm={() => {
          if (Delete) handleDelete(Delete.id);
        }}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa"<strong>${Delete?.title}</strong>"? Hành động này không thể hoàn tác.`}
      />

      {/* Pagination */}
      <div className="my-4 flex justify-center">
        <Pagination className="gap-3">
          <PaginationPrevious
            className="cursor-pointer"
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
            className="cursor-pointer"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default ListBlog;
