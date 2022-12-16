import React, { useCallback, useEffect, useRef } from 'react';
import THREE from 'three';
import gsap from 'gsap';

import { Refs as ThroneRefs } from '../models/Throne';
import { Refs as PlatformRefs } from '../models/Platform';

export const useTimeline = ({
	throne,
	platform,
	radiator,
}: {
	throne: ThroneRefs;
	platform: PlatformRefs;
	radiator: React.RefObject<THREE.Group>;
}) => {
	const timeline = useRef(
		gsap.timeline({
			defaults: {
				ease: 'power1.inOut',
			},
		})
	);

	const getFloat = useCallback(() => {
		const tl = gsap
			.timeline({
				defaults: {
					duration: 2,
					ease: 'power1.inOut',
					repeat: 3,
					yoyo: true,
				},
			})
			.pause();

		tl.to(platform.medium.current!.position, {
			z: platform.medium.current!.position.z + 1.5,
		}).to(
			platform.outer.current!.position,
			{ delay: 0.5, z: platform.outer.current!.position.z + 1.5 },
			'0'
		);

		return tl;
	}, [platform.medium, platform.outer]);

	useEffect(() => {
		const currentTimeline = timeline.current;
		timeline.current.pause();

		timeline.current
			.addLabel('opening')
			//Platform expanding
			.to(platform.medium.current!.position, { duration: 2, z: 9 })
			.to(platform.outer.current!.position, { duration: 2.5, z: 19 }, '<')
			.call(() => {
				getFloat().play();
			})

			//Radiator adjust its position
			.to(radiator.current!.position, { duration: 2, y: -0.3 }, 'opening')

			//Throne ascending
			.to(
				throne.current!.map((mesh) => mesh.position),
				{ duration: 2.5, y: 0, stagger: 0.1 },
				'opening'
			)
			.to(throne.current![0].rotation, { duration: 7, y: Math.PI * 0.5 })
			.to(throne.current![1].rotation, { duration: 7, y: Math.PI * 1.0 }, '<')
			.to(throne.current![2].rotation, { duration: 7, y: Math.PI * 1.5 }, '<')
			.to(throne.current![3].rotation, { duration: 7, y: Math.PI * 2.0 }, '<')
			.to(throne.current![4].rotation, { duration: 7, y: Math.PI * 2.5 }, '<')
			.to(throne.current![5].rotation, { duration: 7, y: Math.PI * 3.0 }, '<')
			.to(throne.current![6].rotation, { duration: 7, y: Math.PI * 3.5 }, '<')
			.to(throne.current![7].rotation, { duration: 7, y: Math.PI * 4.0 }, '<')
			.to(throne.current![8].rotation, { duration: 7, y: Math.PI * 4.5 }, '<')

			.addLabel('closing', '11')
			//Platform descending
			.to(platform.medium.current!.position, { duration: 2, z: 0 }, 'closing')
			.to(platform.outer.current!.position, { duration: 2, z: 0 }, '<')

			//Radiator going back to origin
			.to(radiator.current!.position, { duration: 2, y: -0.05 }, 'closing')

			//Throne descending
			.to(throne.current![8].position, { duration: 2, y: -0.61 }, 'closing')
			.to(throne.current![7].position, { duration: 2, y: -0.6 }, '<+0.1')
			.to(throne.current![6].position, { duration: 2, y: -0.58 }, '<+0.1')
			.to(throne.current![5].position, { duration: 2, y: -0.56 }, '<+0.1')
			.to(throne.current![4].position, { duration: 2, y: -0.53 }, '<+0.1')
			.to(throne.current![3].position, { duration: 2, y: -0.49 }, '<+0.1')
			.to(throne.current![2].position, { duration: 2, y: -0.42 }, '<+0.1')
			.to(throne.current![1].position, { duration: 2, y: -0.34 }, '<+0.1')
			.to(throne.current![0].position, { duration: 2, y: -0.2 }, '<+0.1');

		return () => {
			currentTimeline.clear();
		};
	}, [getFloat, platform.medium, platform.outer, radiator, throne]);

	return timeline;
};

export default useTimeline;
