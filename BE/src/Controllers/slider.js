import Slider from "../models/slider";


class SliderController {
    async getAllSlides(req, res) {
        try {
            const slides = await Slider.find({});
            res.json(slides);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }
    

    async getSlideDetail(req, res) {
        try {
            const slide = await Slider.findById(req.params.id);
            if (!slide) {
                return res.status(404).json({ message: 'Slide not found' });
            }
            res.json(slide);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async createSlide(req, res) {
        try {
            const newSlide = new Slider(req.body);
            const savedSlide = await newSlide.save();
            res.status(201).json(savedSlide);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async updateSlide(req, res) {
        try {
            const updatedSlide = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedSlide) {
                return res.status(404).json({ message: 'Slide not found' });
            }
            res.json(updatedSlide);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async deleteSlide(req, res) {
        try {
            const deletedSlide = await Slider.findByIdAndDelete(req.params.id);
            if (!deletedSlide) {
                return res.status(404).json({ message: 'Slide not found' });
            }
            res.json({ message: 'Slide deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }
}

export default SliderController;
