import { StatusCodes } from "http-status-codes";
import Voucher from "../models/voucher"

export const getAllVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.find();
        if (voucher.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Voucher not found" })
        }
        return res.status(StatusCodes.OK).json(voucher)
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
        return res.status(StatusCodes.OK).json(voucher)
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