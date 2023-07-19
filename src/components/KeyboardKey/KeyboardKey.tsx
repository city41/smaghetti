import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './KeyboardKey.module.css';

type KeyboardKeyProps = {
	className?: string;
	children: ReactNode;
};

// const Root = styled.kbd`
//   display: inline-block;
//   text-align: center;
//
//   padding: 2px 6px;
//   border-radius: 4px;
//   background-color: #888;
//   color: white;
//   font-weight: bold;
//   border-bottom: 4px solid rgba(0, 0, 0, 0.5);
//   min-width: 24px;
//
//   font-family: monospace;
//   font-weight: 700;
// `;

const KeyboardKey: FunctionComponent<KeyboardKeyProps> = ({ children }) => {
	return (
		<kbd
			className={clsx(
				styles.root,
				'inline-block text-center p-1 rounded-lg bg-gray-200 text-gray-900 font-mono font-bold border-b-2 border-gray-700'
			)}
		>
			{children}
		</kbd>
	);
};

export { KeyboardKey };
