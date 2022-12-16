import React, { useEffect, useRef } from 'react';

import Dice from '../../models/Dice';
import Throne from '../../models/Throne';
import Platform, { Refs as PlatformRefs } from '../../models/Platform';
import Radiator from '../../models/Radiator';
import useTimeline from '../../hooks/useTimeline';

export const Scene = () => {
	const throne = useRef<THREE.Mesh[]>([]);
	const radiator = useRef<THREE.Group>(null);

	const platform: PlatformRefs = {
		medium: useRef<THREE.Mesh>(null),
		outer: useRef<THREE.Mesh>(null),
	};

	const timeline = useTimeline({ throne, platform, radiator });

	useEffect(() => {
		timeline.current.play().repeat(-1);
	}, [timeline]);

	throne.current.length = 0;

	return (
		<scene>
			<group position={[0, -0.9, 0]}>
				<Dice position={[-0.56, 2.15, -0.16]} />
				<Dice position={[0.55, 1.85, 0.07]} />

				<Throne refs={throne} rotation={[0, 0.8, 0]} />

				<Platform refs={platform} />

				<Radiator ref={radiator} position={[0, -0.1, -0.2]} />
			</group>
		</scene>
	);
};

export default Scene;
