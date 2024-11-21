
interface StatusMenuProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusMenu = ({ selectedStatus, onStatusChange }: StatusMenuProps) => {
  // Danh sách các trạng thái
  const statuses = [
    "đang chờ",
    "đang xử lý",
    "đã hoàn thành",
    "đã hủy",
  ];

  return (
    <div className="py-4">
      <div className="flex space-x-6">
        {statuses.map((status) => (
          <div
            key={status}
            className={`cursor-pointer text-lg font-semibold ${
              selectedStatus === status
                ? "border-b-2 border-red-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusMenu;
