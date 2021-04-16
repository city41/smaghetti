import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { PlainIconButton } from '../../../PlainIconButton';
import { MdFileUpload } from 'react-icons/md';
import { toHexString } from '../util';

type ByteInputFieldProps = {
	className?: string;
	value: number[];
	onChange: (newValue: number[]) => void;
};

function bytesToHexString(data: number[]) {
	return data.map(toHexString).join(' ');
}

function byteStringToBytes(bs: string): number[] {
	return bs.split(' ').map((bss) => parseInt(bss.trim(), 16));
}

function ByteInputField({ className, value, onChange }: ByteInputFieldProps) {
	const [bytesString, setBytesString] = useState(bytesToHexString(value));

	useEffect(() => {
		setBytesString(bytesToHexString(value));
	}, [value]);

	return (
		<div className={clsx(className, 'text-sm flex flex-row items-center')}>
			<input
				className="w-16"
				type="text"
				value={bytesString}
				onChange={(e) => {
					setBytesString(e.target.value);
				}}
			/>
			<PlainIconButton
				label="update"
				icon={MdFileUpload}
				onClick={() => {
					const bytes = byteStringToBytes(bytesString);
					onChange(bytes);
				}}
			/>
		</div>
	);
}

export { ByteInputField };
