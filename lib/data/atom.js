import { atom } from "recoil";

export const needUpdateState = atom({
  key: "needUpdateState",
  default: true,
});

export const storageListState = atom({
  key: "storageListState",
  default: [],
});
