import axios from "axios";

export async function getCodeReview(code: string) {
  const prompt = `이 코드 리뷰해줘: ${code}\n\n`;
  const response = await axios.post(
    "https://api.openai.com/v1/models/text-davinci-03/completions",
    {
      prompt,
      max_tokens: 60,
      temperature: 0.7,
      n: 1,
      stop: "\n",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    }
  );
  const { choices } = response.data;
  return choices[0].text;
}
