import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type GLTFResult = GLTF & {
  nodes: {
    inner: THREE.Mesh;
    medium: THREE.Mesh;
    outer: THREE.Mesh;
  },
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
  }
}