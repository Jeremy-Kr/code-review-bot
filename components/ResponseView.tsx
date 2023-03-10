import reviewState from "@/atoms/reviewAtom";
import { useRecoilValue } from "recoil";

const ResponseView = () => {
  const review = useRecoilValue(reviewState);
  return <div>{review}</div>;
};

export default ResponseView;
