import React, { useEffect, useState, ReactNode } from 'react';

type IfNotTooSmallProps = {
	tooSmallDisplay: ReactNode;
	children: () => ReactNode;
};

// TODO: these are also used in media queries, can this be DRY'd up somehow?
const MIN_WIDTH = 891;
const MIN_HEIGHT = 516;

function isTooSmall(): boolean {
	return window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT;
}

function IfNotTooSmall({ tooSmallDisplay, children }: IfNotTooSmallProps) {
	if (typeof window === 'undefined') {
		return <>{children()}</>;
	}

	const [tooSmall, setTooSmall] = useState(isTooSmall());

	useEffect(() => {
		const onWindowSizeChange = () => {
			setTooSmall(isTooSmall());
		};
		window.addEventListener('resize', onWindowSizeChange);

		return () => {
			window.removeEventListener('resize', onWindowSizeChange);
		};
	}, []);

	if (tooSmall) {
		return <>{tooSmallDisplay}</>;
	} else {
		return <>{children()}</>;
	}
}

export { IfNotTooSmall };
export type { IfNotTooSmallProps };
