import axios from "axios";

const BASE_URL = "http://localhost/poems.php";

export const getPoems = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
