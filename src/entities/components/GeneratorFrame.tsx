import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { IconFactory, IconStopSign } from '../../icons';

type GeneratorFrameProps = {
	className?: string;
	resourceClassName: string;
	canceler?: boolean;
	resourceStyle?: CSSProperties;
	size: number;
	children?: ReactNode;
};

function GeneratorFrame({
	className,
	resourceClassName,
	canceler,
	resourceStyle,
	size,
	children,
}: GeneratorFrameProps) {
	const rootStyle = {
		width: size,
		height: size,
		borderRadius: '10%',
	};

	const iconStyle = {
		width: size / 2,
		height: size / 2,
		padding: '4%',
	};

	const Icon = canceler ? IconStopSign : IconFactory;

	return (
		<div
			style={rootStyle}
			className={clsx(className, 'relative bg-no-repeat', {
				'bg-green-600': !canceler,
				'bg-red-500': canceler,
			})}
		>
			<div
				style={resourceStyle}
				className={clsx(
					resourceClassName,
					'absolute top-0 left-0 w-full h-full'
				)}
			/>

			{children}
			<Icon
				style={iconStyle}
				className="absolute bottom-0 right-0 text-white"
			/>
		</div>
	);
}

export { GeneratorFrame };
