import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const [amount, setAmount] = useState(10000); // Giá trị mặc định
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng hook navigate

  const handleCreatePayment = async () => {
    try {
      setLoading(true); // Bắt đầu quá trình tạo thanh toán
      setError(null); // Reset lỗi trước khi gửi yêu cầu

      // Gửi yêu cầu đến backend
      const response = await axios.post('http://localhost:8080/api/create_payment_url', {
        amount: 1000000,
        bankCode: 'VNB',
        // Các tham số cần thiết khác
      });

      // Lấy URL thanh toán từ backend
      const paymentUrl = response.data.url;

      // Chuyển hướng đến URL thanh toán bên ngoài bằng navigate (trong trường hợp muốn điều hướng trong ứng dụng React)
      window.location.href = paymentUrl;
// Tuy nhiên, điều này chỉ hợp lệ nếu paymentUrl là một route hợp lệ trong ứng dụng của bạn
    } catch (error) {
      setError('Có lỗi khi tạo thanh toán');
      console.error('Có lỗi khi tạo thanh toán', error);
    } finally {
      setLoading(false); // Kết thúc quá trình tạo thanh toán
    }
  };

  return (
    <div>
      <h1>Tạo Đơn Thanh Toán</h1>
      <div>
        <label>Số tiền: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button onClick={handleCreatePayment} disabled={loading}>
        {loading ? 'Đang tạo thanh toán...' : 'Tạo thanh toán'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && !error && <p>Đang tạo thanh toán, vui lòng đợi...</p>}
    </div>
  );
};

export default PaymentComponent;
