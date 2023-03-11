import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atomone } from "@uiw/codemirror-theme-atomone";
import {
  langNames,
  langs,
  LanguageName,
  loadLanguage,
} from "@uiw/codemirror-extensions-langs";
import { orderBy } from "lodash";

import reviewState from "@/atoms/reviewAtom";
import langState from "@/atoms/langAtom";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [sortedLangNames, setSortedLangNames] = useState<typeof langNames>([]);
  const [lang, setLang] = useRecoilState(langState);

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

  useEffect(() => {
    setSortedLangNames(orderBy(langNames));
  }, []);

  return (
    <div className="flex flex-col">
      <select
        className="h-8 w-32"
        onChange={(e) => setLang(e.target.value as LanguageName)}
        value={lang}
      >
        {sortedLangNames.map((lang) => (
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
      <button onClick={onClickHandler}>Submit</button>
    </div>
  );
};

export default CodeInput;
