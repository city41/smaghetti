import clsx from 'clsx';
import React from 'react';

type OnBytesChangeProps = {
	address: number;
	bytes: number[];
};

type OnAnnotationprops = {
	start: number;
	size: number;
	description: string;
};

type HexExplorerProps = {
	className?: string;
	bytes: number[] | Uint8Array;
	onBytesChange: (props: OnBytesChangeProps) => void;
	onAnnotation: (props: OnAnnotationprops) => void;
};

function HexExplorer({ className }: HexExplorerProps) {
	return <div className={clsx(className)}>hex explorer</div>;
}

export { HexExplorer };
