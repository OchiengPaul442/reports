"use client";
import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <RingLoader color="#013ee6" />
    </div>
  );
}
