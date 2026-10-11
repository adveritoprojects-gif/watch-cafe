"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  easing,
  modelOffsets,
  modelPartNames,
  modelWindows,
  segment,
  type ModelPartName,
} from "@/lib/assembly";
import { modelUrl } from "@/lib/model";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

type Binding = {
  object: THREE.Object3D;
  origin: THREE.Vector3;
  originRotation: THREE.Euler;
  name: ModelPartName;
};

type Props = {
  progressRef: RefObject<number>;
  dragRef: RefObject<number>;
  mobile: boolean;
};

function normalize(name: string) {
  return name.toLowerCase().replace(/[\s_-]/g, "");
}

export function WatchModel({ progressRef, dragRef, mobile }: Props) {
  const gltf = useGLTF(modelUrl());
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const wrapper = useRef<THREE.Group>(null);
  const bindings = useRef<Binding[]>([]);
  const camera = useThree((state) => state.camera);
  const scale = mobile ? 0.62 : 1;

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    scene.position.sub(center);
    const max = Math.max(size.x, size.y, size.z) || 1;
    scene.scale.setScalar((mobile ? 1.8 : 2.25) / max);

    const lookup = new Map<string, ModelPartName>();
    modelPartNames.forEach((name) => lookup.set(normalize(name), name));

    const next: Binding[] = [];
    scene.traverse((object) => {
      const key = lookup.get(normalize(object.name));
      if (!key || object === scene) return;
      next.push({
        object,
        origin: object.position.clone(),
        originRotation: object.rotation.clone(),
        name: key,
      });
    });
    bindings.current = next;
  }, [mobile, scene]);

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    bindings.current.forEach((binding) => {
      const spec = modelOffsets[binding.name];
      const [start, end] = modelWindows[binding.name];
      const settled = segment(progress, start, end, easing[spec.ease]);
      const remain = 1 - settled;
      binding.object.position.set(
        binding.origin.x + spec.position[0] * scale * remain,
        binding.origin.y + spec.position[1] * scale * remain,
        binding.origin.z + spec.position[2] * scale * remain,
      );
      binding.object.rotation.set(
        binding.originRotation.x + spec.rotation[0] * remain,
        binding.originRotation.y + spec.rotation[1] * remain,
        binding.originRotation.z + spec.rotation[2] * remain,
      );
    });

    const zoom = easing.power2(progress);
    camera.position.z = THREE.MathUtils.lerp(mobile ? 6.4 : 8, mobile ? 5.4 : 5.5, zoom);
    camera.position.y = 0.15 + Math.sin(progress * Math.PI) * (mobile ? 0.04 : 0.08);
    camera.lookAt(0, 0, 0);

    if (wrapper.current) {
      const assemblyTurn = (progress - 0.5) * (mobile ? 0.2 : 0.4);
      wrapper.current.rotation.y = progress > 0.985 ? (dragRef.current ?? 0) : assemblyTurn;
    }
  });

  return (
    <group ref={wrapper}>
      <primitive object={scene} />
    </group>
  );
}
