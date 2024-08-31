import Collection from "../models/collection";


class CollectionController {
  async getCollections(req, res) {
    try {
      const collections = await Collection.find().populate('products');
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async getCollectionDetail(req, res) {
    try {
      const collection = await Collection.findById(req.params.id).populate('products');
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async createCollection(req, res) {
    try {
      const newCollection = new Collection(req.body);
      await newCollection.save();
      res.status(201).json(newCollection);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async updateCollection(req, res) {
    try {
      const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCollection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.json(updatedCollection);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  async deleteCollection(req, res) {
    try {
      const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
      if (!deletedCollection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.json({ message: 'Collection deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
}

export default CollectionController;
