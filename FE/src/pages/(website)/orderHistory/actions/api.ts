import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createComment = async (data: {
  content: string;
  infoProductBuy: string;
  itemId: string;
  orderId: string;
  productId: string;
  rating: number;
  userId: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/comment`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
