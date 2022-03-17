import React from 'react';

type UnfocusableButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

function UnfocusableButton(props: UnfocusableButtonProps) {
	return (
		<button
			{...props}
			onFocus={(e) => {
				e.preventDefault();
				e.target.blur();
			}}
		/>
	);
}

export { UnfocusableButton };
