import axios from "axios";

export async function getProductEdit(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${id}/edit`
    );
    document.title = `Page: ${response?.data.name}`;
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
