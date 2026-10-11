"use client";

import { PerspectiveCamera } from "@react-three/drei";

export function WatchCamera() {
  return <PerspectiveCamera makeDefault fov={30} near={0.1} far={40} position={[0, 0.15, 8]} />;
}
