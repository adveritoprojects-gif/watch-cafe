"use client";

import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function StudioEnvironment() {
  const { gl, scene } = useThree();

  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    return () => {
      target.dispose();
      pmrem.dispose();
      if (scene.environment === target.texture) scene.environment = null;
    };
  }, [gl, scene]);

  return null;
}
