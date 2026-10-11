"use client";

import { WatchCamera } from "@/components/watch/WatchCamera";
import { WatchLights } from "@/components/watch/WatchLights";
import { WatchModel } from "@/components/watch/WatchModel";
import { StudioEnvironment } from "@/components/watch/StudioEnvironment";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, type RefObject } from "react";

type Props = {
  progressRef: RefObject<number>;
  dragRef: RefObject<number>;
  mobile: boolean;
  onContextLost: () => void;
};

export function WatchScene({ progressRef, dragRef, mobile, onContextLost }: Props) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        const lost = (event: Event) => {
          event.preventDefault();
          onContextLost();
        };
        canvas.addEventListener("webglcontextlost", lost);
      }}
    >
      <SceneLifecycle onContextLost={onContextLost} />
      <WatchCamera />
      <WatchLights />
      <StudioEnvironment />
      <Suspense fallback={null}>
        <WatchModel progressRef={progressRef} dragRef={dragRef} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}

function SceneLifecycle({ onContextLost }: { onContextLost: () => void }) {
  useEffect(() => {
    const onLost = () => onContextLost();
    window.addEventListener("webglcontextlost", onLost);
    return () => window.removeEventListener("webglcontextlost", onLost);
  }, [onContextLost]);
  return null;
}
