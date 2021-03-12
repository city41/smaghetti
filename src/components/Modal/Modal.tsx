import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { Button } from '../Button';

type ModalProps = ReactModalProps & {
	title?: string;
	onOkClick?: () => void;
	okDisabled?: boolean;
	onXClick?: () => void;
	noAnimation?: boolean;
	children: ReactNode;
};

// const enterAnimation = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;
//
// const exitAnimation = keyframes`
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// `;
//
// const GlobalModalStyle = createGlobalStyle`
//   .ReactModalPortal {
//     position: relative;
//     z-index: 2;
//   }
//
//   .modalOverlay {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(255, 255, 255, 0.3);
//     overflow-y: auto;
//     z-index: 10;
//
//     &.animate {
//       opacity: 0;
//       transition: opacity 0.1s ease-in-out;
//     }
//
//     &.animate.ReactModal__Overlay--after-open {
//       opacity: 1;
//       & .ReactModal__Content {
//         animation: ${enterAnimation} 0.1s ease-out;
//       }
//     }
//
//     &.animate.ReactModal__Overlay--before-close {
//       opacity: 0;
//       & .ReactModal__Content {
//         animation: ${exitAnimation} 0.2s linear;
//       }
//     }
//
//     overflow: hidden;
//   }
// `;

// const StyledModal = styled(ReactModal)`
// 	position: relative;
//
// 	min-width: 600px;
// 	padding: 16px;
// 	margin: auto;
// 	box-shadow: 0px 32px 0px -16px rgba(0, 0, 0, 0.5);
//
// 	outline: none;
// 	color: var(--global-foreground-color);
//
// 	background-color: var(--global-background-color);
// 	border-radius: 28px;
//
// 	&.hasOkButton {
// 		padding-bottom: 0;
// 	}
//
// 	& .okButton {
// 		display: block;
// 		margin: 16px auto;
// 	}
//
// 	&.hasTitle {
// 		padding-top: 0;
// 	}
//
// 	& .title {
// 		text-align: center;
// 		margin: 20px auto;
// 	}
//
// 	&.hasXButton {
// 		border-top-right-radius: 0;
// 	}
// `;
//
// const X = styled.button`
// 	position: absolute;
// 	right: 0px;
// 	top: 0px;
//
// 	border: 8px solid var(--global-background-color);
// 	outline: none;
//
// 	background-color: var(--global-foreground-color);
// 	color: var(--global-background-color);
// 	cursor: pointer;
//
// 	height: 40px;
// 	width: 40px;
//
// 	display: grid;
// 	place-items: center;
//
// 	font-size: 16px;
// 	font-weight: bold;
// `;

function Modal({
	onOkClick,
	okDisabled,
	onXClick,
	noAnimation,
	title,
	children,
	...rest
}: ModalProps) {
	const overlayClassName = clsx('modalOverlay', { animate: !noAnimation });

	const modalClassName = clsx({
		hasOkButton: !!onOkClick,
		hasTitle: !!title,
		hasXButton: !!onXClick,
	});

	return (
		<ReactModal
			{...rest}
			className={modalClassName}
			overlayClassName={overlayClassName}
			closeTimeoutMS={noAnimation ? 0 : 250}
		>
			{!!title && <h2 className="title">{title}</h2>}
			<div>{children}</div>
			{onOkClick && (
				<Button className="okButton" onClick={onOkClick} disabled={okDisabled}>
					okay
				</Button>
			)}
			{onXClick && <button onClick={onXClick}>x</button>}
		</ReactModal>
	);
}

export { Modal };
export type { ModalProps };
