import React from 'react';
import clsx from 'clsx';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
	className?: string;
};

// const ButtonCss = `
//   display: inline-flex;
//   flex-direction: row;
//   align-items: center;
//
//   height: 48px;
//
//   border: none;
//   padding: 8px 16px;
//   background-color: var(--global-foreground-color);
//   color: var(--global-background-color);
//
//   cursor: pointer;
//
//   font-size: 1.3rem;
//   font-weight: bold;
//
//   border-radius: 8px;
//   border-bottom: 4px solid rgba(0, 0, 0, 0.4);
//
//   &:active {
//     transform: scale(1, 0.95) translateY(4px);
//     border-bottom-color: white;
//   }
//
//   &:hover {
//     text-decoration: underline;
//   }
// `;
//
// const Root = styled.button`
//   ${ButtonCss}
// `;

function Button({ className, onClick, children, ...rest }: ButtonProps) {
	return (
		<button
			className={clsx(
				className,
				'px-2 py-1 bg-green-400 hover:bg-green-300 hover:text-green-900'
			)}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
}

export { Button };
export type { ButtonProps };
