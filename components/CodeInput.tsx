import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useMutation } from "@tanstack/react-query";

import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";

import { langState, reviewState } from "@/atoms";
import { LANG_ARRAY } from "@/utils/CONSTANT";
import postCode from "@/utils/postCode";
import ResponseView from "./ResponseView";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [lang, setLang] = useRecoilState(langState);

  const setReview = useSetRecoilState(reviewState);

  const { mutate, isLoading } = useMutation(postCode, {
    onSuccess: ({ data: { review } }) => {
      setReview(review);
    },
  });

  const handleSubmit = (code: string) => {
    if (!code) return alert("코드를 입력해주세요.");
    mutate(code);
  };

  return (
    <div className="m-auto flex flex-col">
      <div>
        <label htmlFor="lang" className="mr-2 text-blue-300">
          언어선택
        </label>
        <select
          className="h-8 w-32 bg-blue-300"
          onChange={(e) => setLang(e.target.value as LanguageName)}
          value={lang}
          id="lang"
        >
          {LANG_ARRAY.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="flex">
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          placeholder="코드를 입력하세요."
          theme={atomone}
          extensions={[loadLanguage(lang)!]}
          height="80vh"
          width="45vw"
          className="border-r border-solid border-gray-300"
        />
        <ResponseView isLoading={isLoading} />
      </div>
      <button
        onClick={() => handleSubmit(code)}
        className={
          (isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-300 hover:bg-blue-200") + " h-12"
        }
      >
        코드리뷰하기
      </button>
    </div>
  );
};

export default CodeInput;
