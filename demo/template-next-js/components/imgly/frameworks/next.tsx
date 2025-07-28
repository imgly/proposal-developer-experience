"use client";

import dynamic from "next/dynamic";
import type { CreativeEditorProps } from "./react";

// CreativeEditor is a client side editor and as such we want to only load it in the frontend when used.
export default dynamic<CreativeEditorProps>(
  () => import("./react"),
  { ssr: false }
);

