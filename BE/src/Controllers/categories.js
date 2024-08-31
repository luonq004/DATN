import category from "../models/category";


class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async createCategory(req, res) {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async updateCategory(req, res) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
}

export default CategoryController;
