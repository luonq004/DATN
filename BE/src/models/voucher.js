import { required } from "joi";
import mongoose from "mongoose";

const dateVietNam = () => {
    const date = new Date();
    return new Date(date.getTime() + 7 * 60 * 60 * 1000)
}

const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["product", "ship"],
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    countOnStock: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["percent", "fixed"],
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        default: dateVietNam,
    },
    endDate: {
        type: Date,
        // required: true,
    }
}, { timestamps: true, versionKey: false })


//Nếu ko nhập endDate
voucherSchema.pre('save', function (next) {
    if (!this.endDate) {
        const defaultEndDate = 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000; // 3 ngày - 3 giờ
        this.endDate = new Date(this.startDate.getTime() + defaultEndDate);
    }
    next();
});

export default mongoose.model('Voucher', voucherSchema)