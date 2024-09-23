import express from 'express';
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from '../controllers/category';

const routerCategory = express.Router();

routerCategory.get(`/category`, getAllCategory)
routerCategory.get(`/category/:id`, getCategoryById)
routerCategory.post(`/category`, createCategory)
routerCategory.put(`/category/:id`, updateCategory)
routerCategory.delete(`/category/:id`, deleteCategory)

export default routerCategory