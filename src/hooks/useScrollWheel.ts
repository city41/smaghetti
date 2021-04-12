import { useEffect } from 'react';

type UseScrollWheelProps = {
	up: () => void;
	down: () => void;
	element: HTMLDivElement | null;
};

const useScrollWheel = ({ up, down, element }: UseScrollWheelProps) => {
	useEffect(() => {
		function handleWheel(e: WheelEvent) {
			e.preventDefault();
			if (e.deltaY > 0) {
				down();
			} else if (e.deltaY < 0) {
				up();
			}
		}

		element?.addEventListener('wheel', handleWheel);

		return () => element?.removeEventListener('wheel', handleWheel);
	}, [element]);
};

export { useScrollWheel };
