import { StatusCodes } from "http-status-codes";
import Voucher from "../models/voucher"

export const getAllVoucher = async (req, res) => {
    try {
        let voucher = await Voucher.find();
        if (voucher.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" })
        }

        const newVoucher = voucher.map((data) => {
            // console.log(data)
            const currentTime = (new Date().getTime() + 7 * 60 * 60 * 1000);
            const endTime = new Date(data.endDate);
            const timeRemaining = endTime - currentTime;

            if (timeRemaining <= 0) return null

            return {
                voucher: data,
                countdown: timeRemaining
            }
        }).filter((data) => data !== null)

        // await voucher.save();
        // console.log(voucher)

        return res.status(StatusCodes.OK).json(newVoucher);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getOneVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findOne({ _id: req.params.id });
        if (voucher.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" })
        }
        const currentTime = new Date();
        const endTime = new Date(voucher.endDate);
        const timeRemaining = endTime - currentTime;

        if (timeRemaining <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Voucher hết hạn" });
        }

        return res.status(StatusCodes.OK).json({
            voucher,
            countdown: timeRemaining
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const createVoucher = async (req, res) => {

    try {
        const exitVoucher = await Voucher.findOne({ code: req.body.code });
        // console.log(exitVoucher)
        if (exitVoucher !== null) {
            const date = new Date();
            if (new Date(exitVoucher.endDate) < new Date(date.getTime() + 7 * 60 * 60 * 1000)) {
                return res.status(StatusCodes.CONFLICT).json({ message: "Code đã tồn tại và hết hạn" })
            } else {
                return res.status(StatusCodes.CONFLICT).json({ message: "Mã code đã tồn tại" })
            }
        }
        const voucher = await Voucher.create(req.body)
        return res.status(StatusCodes.CREATED).json(voucher)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const editVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (voucher.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" })
        }
        return res.status(StatusCodes.OK).json(voucher)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const removeVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findOneAndDelete({ _id: req.params.id })
        if (voucher.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" })
        }
        return res.status(StatusCodes.OK).json(voucher)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getVoucherWithCountdown = async (req, res) => {
    const { voucherId } = req.params;

    try {
        const voucher = await Voucher.findOne({ _id: voucherId });
        if (!voucher) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" });
        }

        const currentTime = new Date();
        const endTime = new Date(voucher.endDate);
        const timeRemaining = endTime - currentTime;

        if (timeRemaining <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Voucher hết hạn" });
        }

        // Trả về thời gian còn lại cùng với thông tin voucher
        return res.status(StatusCodes.OK).json({
            voucher,
            countdown: timeRemaining // thời gian còn lại tính bằng milliseconds
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}