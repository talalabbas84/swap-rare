import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
	EffectComposer,
	Selection,
	SelectiveBloom,
} from '@react-three/postprocessing';

import Scene from './components/Scene/Scene';
import Light from './components/Light/Light';

export const Dice3D = () => {
	const lights = useRef<THREE.Light[]>([]);
	lights.current.length = 0;

	return (
		<Canvas
			style={{
				height: '400px',
				maxHeight: '40vh',
			}}
		>
			<PerspectiveCamera makeDefault position={[-0.3, 1.37, 6.88]} zoom={1.3} />
			<Light ref={lights} />
			<OrbitControls enabled={false} />
			<Selection>
				<EffectComposer autoClear={false}>
					<SelectiveBloom
						lights={lights}
						intensity={3}
						luminanceThreshold={0.0}
						luminanceSmoothing={0.0}
					/>
				</EffectComposer>

				<Scene />
			</Selection>
		</Canvas>
	);
};

export default Dice3D;
