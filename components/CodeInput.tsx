import axios from "axios";

import { useState } from "react";
import { useSetRecoilState } from "recoil";

import reviewState from "@/atoms/reviewAtom";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const setReview = useSetRecoilState(reviewState);
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
    <div className="flex flex-col">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="h-screen/2 w-auto resize-none rounded-lg border border-gray-300 p-2"
        placeholder="코드를 입력하세요."
      />
      <button onClick={onClickHandler}>Submit</button>
    </div>
  );
};

export default CodeInput;
