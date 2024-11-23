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

export async function getAttributeByID(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/attributes/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAttributeByID(id: string, data: { name: string }) {
  try {
    const response = await axios.put(`${apiUrl}/attributes/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
