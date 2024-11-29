// import React, { useState } from 'react';
// import Order from './Order'; // Import biểu đồ

// // Dữ liệu mẫu
// const dataSets = {
//     week: [
//         { week: "Monday", order: 186 },
//         { week: "Tuesday", order: 305 },
//         { week: "Wednesday", order: 237 },
//         { week: "Thursday", order: 73 },
//         { week: "Friday", order: 209 },
//         { week: "Saturday", order: 214 },
//         { week: "Sunday", order: 214 },
//     ],
//     month: [
//         { week: "Week 1", order: 1234 },
//         { week: "Week 2", order: 1456 },
//         { week: "Week 3", order: 1345 },
//         { week: "Week 4", order: 1567 },
//     ],
// };

// const Date = () => {
//     const [chartData, setChartData] = useState(dataSets.week);
//     const [selectedRange, setSelectedRange] = useState('week');

//     // Hàm xử lý khi thay đổi thời gian
//     const handleTimeRangeChange = (range: any) => {
//         setSelectedRange(range);
//         setChartData(dataSets[range]);
//     };

//     return (
//         <div className="p-6">
//             {/* Nút chọn thời gian */}
//             <div className="flex gap-4 mb-4">
//                 <button
//                     onClick={() => handleTimeRangeChange('week')}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                     Tuần trước
//                 </button>
//                 <button
//                     onClick={() => handleTimeRangeChange('month')}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                     Tháng trước
//                 </button>
//             </div>

//             {/* Biểu đồ hiển thị dữ liệu */}
//             {/* <Order chartData={chartData} selectedRange={selectedRange} /> */}
//         </div>
//     );
// };

// export default Date;
