import { Router } from 'express';
import CollectionController from '../Controllers/Collection';

const collectionRouter = Router();
const collectionController = new CollectionController();

collectionRouter.get('/', collectionController.getCollections);
collectionRouter.get('/:id', collectionController.getCollectionDetail);
collectionRouter.post('/', collectionController.createCollection);
collectionRouter.put('/:id', collectionController.updateCollection);
collectionRouter.delete('/:id', collectionController.deleteCollection);

export default collectionRouter;
