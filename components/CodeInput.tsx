import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useMutation } from "@tanstack/react-query";

import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";

import { langState, reviewState } from "@/atoms";
import { LANG_ARRAY } from "@/utils/CONSTANT";
import postCode from "@/utils/postCode";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [lang, setLang] = useRecoilState(langState);

  const setReview = useSetRecoilState(reviewState);

  const { mutate, isLoading } = useMutation(postCode, {
    onSuccess: ({ data: { review } }) => {
      setReview(review);
    },
  });

  return (
    <div className="flex flex-col">
      <select
        className="h-8 w-32"
        onChange={(e) => setLang(e.target.value as LanguageName)}
        value={lang}
      >
        {LANG_ARRAY.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <CodeMirror
        value={code}
        onChange={(value) => setCode(value)}
        placeholder="코드를 입력하세요."
        theme={atomone}
        extensions={[loadLanguage(lang)!]}
        height="40vh"
      />
      <button
        onClick={() => mutate(code)}
        className={isLoading ? "bg-blue-100" : "bg-blue-300"}
      >
        Submit
      </button>
    </div>
  );
};

export default CodeInput;
