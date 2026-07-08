"use client";

import { useBalance } from "../../../packages/store/src/hooks/useBalance";

export default function Home() {
  const balance = useBalance();

  return <div>hi there {balance}</div>;
}