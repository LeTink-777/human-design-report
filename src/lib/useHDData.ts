"use client";

import { useSyncExternalStore } from "react";
import {
  getHDDataServerSnapshot,
  getHDDataSnapshot,
  subscribeHDData,
  type HDDataState,
} from "@/lib/storage";

/** Читает hd_data из localStorage без рассинхрона гидрации. */
export function useHDData(): HDDataState {
  return useSyncExternalStore(
    subscribeHDData,
    getHDDataSnapshot,
    getHDDataServerSnapshot,
  );
}
