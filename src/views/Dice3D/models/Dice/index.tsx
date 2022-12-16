import React from 'react';
import { useGLTF } from '@react-three/drei';

import type { GLTFResult } from './types';
import useAnimation from './useAnimation';

const PATH = '/glb/dice.glb';

export const Dice = React.forwardRef(
	(
		props: JSX.IntrinsicElements['group'],
		ref: React.ForwardedRef<THREE.Group>
	) => {
		const { nodes, materials } = useGLTF(PATH) as any as GLTFResult;

		const { float, gimbal } = useAnimation();

		return (
			<group ref={ref} {...props}>
				<group ref={float}>
					<group ref={gimbal}>
						<mesh
							castShadow
							geometry={nodes.Dice_Cube001.geometry}
							material={materials['DiceRed.001']}
							scale={0.6}
						/>
					</group>
				</group>
			</group>
		);
	}
);

Dice.displayName = 'Dice';

useGLTF.preload(PATH);

export default Dice;
