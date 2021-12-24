import axios from "axios";

const BASE_URL = "https://poem.nikan46.ir/api/poems.php";

export const getPoems = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
