import axios from "axios";

const postCode = async (code: string) => {
  const res = await axios.post(
    "/api/review",
    { code },
    {
      timeout: 30000,
    }
  );

  return res;
};

export default postCode;
