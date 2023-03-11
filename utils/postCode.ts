import axios from "axios";

const postCode = async (code: string) => {
  const res = await axios.post("/api/review", { code });

  return res;
};

export default postCode;
