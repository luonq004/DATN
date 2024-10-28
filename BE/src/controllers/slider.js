import cloudinary from "../config/cloudinary";
import { StatusCodes } from "http-status-codes";
import Slider from "../models/slide";
import fs from "fs";

export const  getAllSlides = async(req, res) =>{
    try {
      const slides = await Slider.find({});
      if (!slides.length) {
        return res.status(404).json({ message: "Không tìm thấy slide nào" });
      }
      res.json(slides);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  export const getSlideDetail= async(req, res) =>{
    try {
      const slide = await Slider.findById(req.params.id);
      if (!slide) {
        return res.status(404).json({ message: "Slide not found" });
      }
      res.json(slide);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  export const createSlide= async(req, res)=> {
    try {
      let imageUrl;
      if (req.file) {
        try {
          // Tải ảnh lên Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'slides',
          });
          imageUrl = result.secure_url;
          
          // Xóa tệp tạm thời sau khi tải lên
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error("Lỗi khi tải ảnh lên Cloudinary:", uploadError);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi khi tải ảnh lên Cloudinary." });
        }
      }
  
      const newSlide = new Slider({
        ...req.body,
        image: imageUrl, // Lưu URL ảnh từ Cloudinary vào slide
      });
  
      const savedSlide = await newSlide.save();
      res.status(StatusCodes.CREATED).json(savedSlide);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server", error });
    }
  }


  export const updateSlide = async(req, res) =>{
    try {
      const slideId = req.params.id;
      let imageUrl;
  
      if (req.file) {
        try {
          // Tải ảnh mới lên Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'slides',
          });
          imageUrl = result.secure_url;
  
          // Xóa tệp tạm thời sau khi tải lên
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error("Lỗi khi tải ảnh lên Cloudinary:", uploadError);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi khi tải ảnh lên Cloudinary." });
        }
      }
  
      const slide = await Slider.findById(slideId);
      if (!slide) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy slide" });
      }
  
      // Xóa ảnh cũ khỏi Cloudinary nếu có ảnh mới
      if (imageUrl && slide.image) {
        const publicId = slide.image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`slides/${publicId}`);
        } catch (deleteError) {
          console.error("Lỗi khi xóa ảnh cũ khỏi Cloudinary:", deleteError);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi khi xóa ảnh cũ khỏi Cloudinary." });
        }
      }
  
      // Cập nhật các trường của slide
      slide.image = imageUrl || slide.image; 
      slide.set(req.body); // Cập nhật các trường khác
  
      const updatedSlide = await slide.save();
      res.status(StatusCodes.OK).json(updatedSlide);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server", error });
    }
  }
  

  export const deleteSlide = async(req, res) => {
    try {
      const deletedSlide = await Slider.findByIdAndDelete(req.params.id);
      if (!deletedSlide) {
        return res.status(404).json({ message: "Slide not found" });
      }
      res.json({ message: "Slide deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

