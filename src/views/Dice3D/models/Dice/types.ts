import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export type GLTFResult = GLTF & {
  nodes: {
    Dice_Cube001: THREE.Mesh;
  },
  materials: {
    ["DiceRed.001"]: THREE.MeshStandardMaterial;
  }
}