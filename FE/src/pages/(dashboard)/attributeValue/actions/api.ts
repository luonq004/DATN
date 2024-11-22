import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllAttributeValue(type: string) {
  try {
    const response = await axios.get(
      `${apiUrl}/attributevalueByAttributeID/${type}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
