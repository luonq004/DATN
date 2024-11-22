import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllAttribute() {
  try {
    const response = await axios.get(`${apiUrl}/attributes`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
