// middleware/authMiddleware.js
import clerk from '../config/clerkCheck';

export const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Lấy token từ header Authorization
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Không có token' });

      // Xác thực token với Clerk
      const { userId, claims } = await clerk.verifyToken(token);
      if (!userId) return res.status(401).json({ message: 'Token không hợp lệ' });

      // Lưu thông tin người dùng vào request object
      req.user = { userId, claims };

      // Kiểm tra quyền của người dùng
      const userRole = claims.publicMetadata?.role; // Lấy quyền từ publicMetadata
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Quyền truy cập không đủ' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Xác thực không thành công', error });
    }
  };
};

export default checkRole