import React from 'react';

export const Light = React.forwardRef(
	({}, ref: React.ForwardedRef<THREE.Light[]>) => {
		const addRef = (l: THREE.Light | null) => {
			if (ref && l && typeof ref === 'object' && ref.current) {
				ref.current.push(l);
			}
		};

		return (
			<>
				<ambientLight ref={addRef} intensity={0.5} />

				<pointLight
					decay={3}
					distance={3}
					power={300}
					intensity={3}
					position={[1.59, 0, -0.6]}
					color='#5c1358'
				/>

				<directionalLight
					intensity={1.38}
					position={[2.01, 1.5, 8.9]}
					color='#630eff'
				/>

				<directionalLight
					intensity={0.5}
					position={[-1.3, 7.55, -2.0]}
					color='#7730ff'
				/>
			</>
		);
	}
);

Light.displayName = 'Light';

export default Light;
