import reviewState from "@/atoms/reviewAtom";
import { useRecoilValue } from "recoil";
import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import langState from "@/atoms/langAtom";
import Loader from "./Loader";

interface ResponseViewProps {
  isLoading: boolean;
}

const ResponseView = ({ isLoading }: ResponseViewProps) => {
  const review = useRecoilValue(reviewState);
  const lang = useRecoilValue(langState);

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <CodeMirror
        value={review}
        placeholder="코드리뷰가 보일 곳"
        theme={atomone}
        extensions={[loadLanguage(lang)!]}
        height="80vh"
        width="45vw"
        editable={false}
        basicSetup={{
          lineNumbers: false,
        }}
      />
    </div>
  );
};

export default ResponseView;
