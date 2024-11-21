import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
  
  interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  }
  
  const PaginationComponent: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <Pagination>
        <PaginationContent>
          {/* Nút "Trang trước" */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              isActive={false}
            >
              Trang trước
            </PaginationPrevious>
          </PaginationItem>
  
          {/* Danh sách các trang */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(index + 1);
                }}
                className={currentPage === index + 1 ? "border border-black" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* Nút "Trang sau" */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              isActive={false}
            >
              Trang sau
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationComponent;
  