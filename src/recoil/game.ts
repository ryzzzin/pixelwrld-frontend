import { atom } from "recoil";
import { Session } from "../types/sessions";
import { paletteColors } from "../utils/paletteColors";

export const currentSessionState = atom<Session | null>({
  key: 'currentSessionState',
  default: null as (Session | null),
});

export const selectedColorState = atom({
  key: 'selectedColorState',
  default: paletteColors[0],
});
