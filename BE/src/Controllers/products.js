import Products from "../models/product";

class ProductController {
  // Lấy danh sách tất cả sản phẩm, phân trang
  async getAllProducts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      };
      const products = await Products.paginate({}, options);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Lấy chi tiết một sản phẩm theo ID
  async getProductDetail(req, res) {
    try {
      const product = await Products.findById(req.params.id).populate('category'); /*.populate('variants')*/
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error getting product detail:", error); 
      res.status(500).json({ message: "Server Error", error });
    }
  }
  

  // Tạo mới một sản phẩm
  async createProduct(req, res) {
    try {
      const newProduct = new Products(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Cập nhật một sản phẩm theo ID
  async updateProduct(req, res) {
    try {
      const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Xóa một sản phẩm theo ID
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

export default ProductController;
