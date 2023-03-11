import { atom } from "recoil";
import type { LanguageName } from "@uiw/codemirror-extensions-langs";

const langState = atom<LanguageName>({
  key: "langState",
  default: "javascript",
});

export default langState;
