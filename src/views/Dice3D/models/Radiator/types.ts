import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type GLTFResult = GLTF & {
  nodes: {
    radiator: THREE.Mesh
  }
}