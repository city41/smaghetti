import React, { FunctionComponent, useState, memo } from 'react';

import { ConnectedPublishModal } from './ConnectedPublishModal';

type PublishButtonProps = {
	className?: string;
};

// const Button = styled.button`
// 	background-color: transparent;
// 	color: white;
// 	font-weight: bold;
// 	font-size: 20px;
//
// 	width: 100%;
// 	height: 100%;
//
// 	border: none;
//
// 	outline: none;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
//
// 	cursor: pointer;
//
// 	transition: scale 0.1s;
//
// 	&:hover {
// 		transform: scale(1.15);
// 	}
//
// 	cursor: pointer;
// `;

const PublishButton: FunctionComponent<PublishButtonProps> = memo(
	({ className }) => {
		const [showModal, setShowModal] = useState(false);

		return (
			<>
				<button
					className={className}
					title="publish your level"
					onClick={() => setShowModal(true)}
				>
					publish
				</button>
				{showModal && (
					<ConnectedPublishModal
						isOpen={true}
						onClose={() => setShowModal(false)}
					/>
				)}
			</>
		);
	}
);

PublishButton.displayName = 'PublishButton';

export { PublishButton };
export type { PublishButtonProps };
