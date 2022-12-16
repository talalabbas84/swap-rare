import { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';

export const useMaterials = () => {
	const inner = useMemo(
		() =>
			new MeshStandardMaterial({
				roughness: 1,
				metalness: 0,
				color: '#1f7386',
				flatShading: true,
			}),
		[]
	);

	const medium = useMemo(
		() =>
			new MeshStandardMaterial({
				roughness: 0.63,
				metalness: 0,
				color: '#0d2665',
				flatShading: true,
			}),
		[]
	);

	const outer = useMemo(
		() =>
			new MeshStandardMaterial({
				roughness: 0.25,
				metalness: 0.47,
				color: '#121724',
				flatShading: true,
			}),
		[]
	);

	return { inner, medium, outer };
};

export default useMaterials;
