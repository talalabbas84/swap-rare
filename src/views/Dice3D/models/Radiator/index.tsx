import React, { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';
import { useGLTF } from '@react-three/drei';
import { Select } from '@react-three/postprocessing';

import type { GLTFResult } from './types';

const PATH = '/glb/radiator.glb';

export const Radiator = React.forwardRef(
	(
		props: JSX.IntrinsicElements['group'],
		ref: React.ForwardedRef<THREE.Group>
	) => {
		/**
		 * Hooks
		 */
		const { nodes } = useGLTF(PATH) as any as GLTFResult;

		const material = useMemo(
			() =>
				new MeshStandardMaterial({
					color: 'white',
					flatShading: true,
					depthWrite: false,
				}),
			[]
		);

		/**
		 * Render
		 */
		return (
			<Select enabled>
				<group ref={ref} {...props}>
					<mesh
						geometry={nodes.radiator.geometry}
						material={material}
						rotation={[Math.PI / 2, 0, Math.PI]}
						position={[0, -0.1, 0]}
						scale={[-0.02, -0.02, 0]}
					/>
				</group>
			</Select>
		);
	}
);

Radiator.displayName = 'Radiator';

useGLTF.preload(PATH);

export default Radiator;
