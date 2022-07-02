import React, { CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';
import { MdFileUpload } from 'react-icons/md';
import { toHexString } from '../hex-tree/HexTreePage/util';
import { PlainIconButton } from '../PlainIconButton';

type ByteInputFieldProps = {
	className?: string;
	style?: CSSProperties;
	value: number[];
	onChange: (newValue: number[]) => void;
	onFocus: () => void;
	fullInput?: boolean;
	labelIndex: number;
};

function bytesToHexString(data: number[]) {
	return data.map(toHexString).join(' ');
}

function byteStringToBytes(bs: string): number[] {
	return bs.split(' ').map((bss) => parseInt(bss.trim(), 16));
}

function ByteInputField({
	className,
	style,
	value,
	onChange,
	onFocus,
	fullInput,
	labelIndex,
}: ByteInputFieldProps) {
	const [bytesString, setBytesString] = useState(bytesToHexString(value));
	const [hasFocus, setHasFocus] = useState(false);

	useEffect(() => {
		setBytesString(bytesToHexString(value));
	}, [value]);

	return (
		<div
			className={clsx(className, 'text-sm flex flex-row items-center', {
				'border border-yellow-400': labelIndex !== -1 && labelIndex & 1,
				'border border-green-400': labelIndex !== -1 && !(labelIndex & 1),
			})}
			style={style}
		>
			<input
				className={clsx('invert', {
					'w-8': !fullInput,
					'w-full': fullInput,
				})}
				type="text"
				value={bytesString}
				onFocus={() => {
					setHasFocus(true);
					onFocus?.();
				}}
				onChange={(e) => {
					setBytesString(e.target.value);
				}}
			/>
			{hasFocus && (
				<PlainIconButton
					label="update"
					icon={MdFileUpload}
					onClick={() => {
						const bytes = byteStringToBytes(bytesString);
						onChange(bytes);
						setHasFocus(false);
					}}
				/>
			)}
		</div>
	);
}

export { ByteInputField };
