import { StatusCodes } from "http-status-codes";
import Checkout from "../models/checkout";

export const create = async (req, res) => {
    try {
        const checkout = await Checkout.create(req.body);
        return res.status(StatusCodes.CREATED).json(checkout);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const getAll = async (req, res) => {
    try {
        const checkout = await Checkout.find();
        return res.status(StatusCodes.CREATED).json(checkout);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const getById = async (req, res) => {
    try {
        console.log(req.params.id)
        const checkout = await Checkout.findById(req.params.id).populate('userId');

        return res.status(StatusCodes.CREATED).json(checkout);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const updateCheckout = async (req, res) => {
    // console.log(req.body)
    try {
        const checkout = await Checkout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.CREATED).json(checkout);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const deleteCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.CREATED).json(checkout);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
