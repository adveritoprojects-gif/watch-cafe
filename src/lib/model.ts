const MODEL_URL = "/models/aurelis-watch.glb";

export function modelUrl() {
  return MODEL_URL;
}

export function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export async function modelIsAvailable() {
  try {
    const response = await fetch(MODEL_URL, { headers: { Range: "bytes=0-11" } });
    if (!response.ok && response.status !== 206) return false;
    const type = response.headers.get("content-type") ?? "";
    if (type.includes("text/html")) return false;
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 4) return false;
    return new TextDecoder().decode(buffer.slice(0, 4)) === "glTF";
  } catch {
    return false;
  }
}
