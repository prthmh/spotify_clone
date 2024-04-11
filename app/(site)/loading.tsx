"use client";

import { FadeLoader } from "react-spinners";

import Box from "@/components/Box";

function Loading() {
  return (
    <Box className="h-full flex items-center justify-center">
      <FadeLoader color="#22c55e" />
    </Box>
  );
}

export default Loading;
