import React, { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import type { GLTFResult } from './types';

const PATH = '/glb/throne.glb';

export type Refs = React.RefObject<THREE.Mesh[]>;

type Prop = { refs: Refs } & JSX.IntrinsicElements['group'];

export const Throne = React.forwardRef(
	({ refs, ...props }: Prop, ref: React.ForwardedRef<THREE.Group>) => {
		/**
		 * Hooks
		 */
		const { nodes } = useGLTF(PATH) as any as GLTFResult;

		const material = useMemo(
			() =>
				new MeshStandardMaterial({
					color: 'white',
					flatShading: true,
					metalness: 0.9,
					roughness: 0.5,
				}),
			[]
		);

		const addRefs = (mesh: THREE.Mesh | null) => {
			if (refs && refs.current && mesh) {
				refs.current.push(mesh);
			}
		};

		/**
		 * Render
		 */
		return (
			<group ref={ref} {...props}>
				<mesh geometry={nodes.Cube002.geometry} material={material} />
				<mesh
					ref={addRefs}
					geometry={nodes.Cube003.geometry}
					material={material}
					position={[0, -0.2, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube005.geometry}
					material={material}
					position={[0, -0.34, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube004.geometry}
					material={material}
					position={[0, -0.42, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube006.geometry}
					material={material}
					position={[0, -0.49, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube007.geometry}
					material={material}
					position={[0, -0.53, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube008.geometry}
					material={material}
					position={[0, -0.56, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube009.geometry}
					material={material}
					position={[0, -0.58, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube010.geometry}
					material={material}
					position={[0, -0.6, 0]}
				/>
				<mesh
					ref={addRefs}
					geometry={nodes.Cube011.geometry}
					material={material}
					position={[0, -0.61, 0]}
				/>
			</group>
		);
	}
);

Throne.displayName = 'Throne';

useGLTF.preload(PATH);

export default Throne;
