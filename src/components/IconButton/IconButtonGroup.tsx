import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './IconButtonGroup.module.css';

type IconButtonGroupProps = {
	className?: string;
	anchor?: 'top' | 'top-right' | 'left';
};

// const Root = styled.div`
//   display: flex;
//   flex-direction: row;
//   box-shadow: var(--item-box-shadow, 0 4px 6px 1px rgba(0, 0, 0, 0.5));
//   border-radius: 16px;
//
//   & > * {
//     box-shadow: none !important;
//   }
//
//   & > *:first-child {
//     margin-right: 0;
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
//   }
//
//   & > *:not(:last-child):not(:first-child) {
//     border-radius: 0;
//   }
//
//   & > *:last-child {
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//   }
//
//   & > *:not(:first-child) {
//     border-left-width: 0;
//     width: 52px;
//   }
// `;

const IconButtonGroup: FunctionComponent<IconButtonGroupProps> = ({
	className,
	anchor,
	children,
}) => {
	return (
		<div
			className={clsx(className, styles.root, 'flex rounded-bl-xl shadow-lg', {
				[styles.horizontal]: anchor !== 'left',
				[styles.vertical]: anchor === 'left',
				'flex-row': anchor !== 'left',
				'flex-col': anchor === 'left',
				'rounded-br-xl': anchor !== 'top-right',
			})}
		>
			{children}
		</div>
	);
};

export { IconButtonGroup };
