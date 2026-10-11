"use client";

export function WatchLights() {
  return (
    <>
      <ambientLight intensity={0.28} color="#f1e9dc" />
      <hemisphereLight args={["#f6f0e6", "#1a1612", 0.42]} />
      <directionalLight position={[4.5, 6, 5]} intensity={2.6} color="#fff6ea" />
      <directionalLight position={[-6, 1.5, 2]} intensity={0.55} color="#b7c4d4" />
      <spotLight
        position={[1.2, 3.2, 4]}
        angle={0.42}
        penumbra={0.9}
        intensity={12}
        color="#e0bd7a"
        distance={18}
      />
      <directionalLight position={[-1, -2, -5]} intensity={0.35} color="#c7a56a" />
    </>
  );
}
