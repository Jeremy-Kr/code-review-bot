import axios from "axios";
import { useState } from "react";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const onClickHandler = () => {
    axios
      .post("/api/review", { code })
      .then((res) => {
        setReview(res.data.review);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={onClickHandler}>Submit</button>
      <div>{review}</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default CodeInput;
