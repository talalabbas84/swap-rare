import React from 'react';
import { useGLTF } from '@react-three/drei';

import type { GLTFResult } from './types';
import useMaterial from './useMaterial';

const PATH = '/glb/platform.glb';

export type Refs = {
	medium: React.RefObject<THREE.Mesh>;
	outer: React.RefObject<THREE.Mesh>;
};

type Prop = { refs: Refs } & JSX.IntrinsicElements['group'];

export const Platform = React.forwardRef(
	({ refs, ...props }: Prop, ref: React.ForwardedRef<THREE.Group>) => {
		const { nodes } = useGLTF(PATH) as any as GLTFResult;

		const material = useMaterial();

		return (
			<group
				ref={ref}
				rotation={[Math.PI / 2, 0, Math.PI]}
				scale={0.01}
				position={[0, -0.05, 0]}
				{...props}
			>
				<mesh geometry={nodes.inner.geometry} material={material.inner} />
				<mesh
					ref={refs.medium}
					geometry={nodes.medium.geometry}
					material={material.medium}
				/>
				<mesh
					ref={refs.outer}
					geometry={nodes.outer.geometry}
					material={material.outer}
				/>
			</group>
		);
	}
);

Platform.displayName = 'Platform';

useGLTF.preload(PATH);

export default Platform;
