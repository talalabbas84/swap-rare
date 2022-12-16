import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const useAnimation = () => {
	const float = useRef<THREE.Group>(null);
	const gimbal = useRef<THREE.Group>(null);

	const amplitude = useRef(0.05 + 0.1 * Math.random());
	const frequency = useRef(0.6 + 0.6 * Math.random());

	useFrame((state) => {
		if (float.current) {
			float.current.position.y =
				amplitude.current *
				Math.sin(state.clock.getElapsedTime() * frequency.current);
		}
	});

	useEffect(() => {
		if (gimbal.current) {
			let tweenX: GSAPTween;
			let tweenY: GSAPTween;

			const rotateX = () => {
				tweenX = gsap.to(gimbal.current!.rotation, {
					x: 0.5 + Math.random() * 1.5 * Math.PI,
					duration: 1 + Math.random() * 2,
					ease: 'power2.inOut',
					onComplete: rotateX,
				});
			};

			const rotateY = () => {
				tweenY = gsap.to(gimbal.current!.rotation, {
					y: 0.5 + Math.random() * 1.5 * Math.PI,
					duration: 1 + Math.random() * 2,
					ease: 'power2.inOut',
					onComplete: rotateY,
				});
			};

			rotateX();
			rotateY();

			return () => {
				tweenX.kill();
				tweenY.kill();
			};
		}
	}, [gimbal.current]);

	return { float, gimbal };
};

export default useAnimation;
