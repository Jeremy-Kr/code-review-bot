import reviewState from "@/atoms/reviewAtom";
import { useRecoilValue } from "recoil";
import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import langState from "@/atoms/langAtom";

const ResponseView = () => {
  const review = useRecoilValue(reviewState);
  const lang = useRecoilValue(langState);

  return (
    <CodeMirror
      value={review}
      placeholder="코드리뷰가 보일 곳"
      theme={atomone}
      extensions={[loadLanguage(lang)!]}
      height="40vh"
      editable={false}
      basicSetup={{
        lineNumbers: false,
      }}
    />
  );
};

export default ResponseView;
