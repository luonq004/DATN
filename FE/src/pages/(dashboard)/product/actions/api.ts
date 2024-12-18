import axios from "axios";

export async function getProductEdit(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${id}`
    );
    document.title = `Page: ${response?.data.name}`;
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAtributes() {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/attributes");
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
