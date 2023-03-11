import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `이 코드 리뷰해줘: ${code}`,
    max_tokens: 512,
    temperature: 0,
  });

  res.status(200).json({ review: response.data.choices[0].text });
};

export default handler;
