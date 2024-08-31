import { Router } from 'express';
import CategoryController from '../Controllers/categories';

const categoriesRouter = Router();
const categoryController = new CategoryController();

categoriesRouter.get('/', categoryController.getCategories);
categoriesRouter.get('/:id', categoryController.getCategoryDetail);
categoriesRouter.post('/', categoryController.createCategory);
categoriesRouter.put('/:id', categoryController.updateCategory);
categoriesRouter.delete('/:id', categoryController.deleteCategory);

export default categoriesRouter;
