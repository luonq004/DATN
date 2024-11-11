import axios from "axios";

export async function getAllProduct() {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
