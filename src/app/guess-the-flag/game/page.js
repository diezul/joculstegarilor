"use client";

import { Suspense } from "react";
import GameContent from "./GameContent";

export default function GamePage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <GameContent />
    </Suspense>
  );
}
