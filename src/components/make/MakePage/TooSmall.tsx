import React from 'react';

function TooSmall() {
	return (
		<div className="w-full max-w-lg p-8 pt-24 mx-auto">
			<h1 className="text-2xl font-bold mb-4">Too Small</h1>
			<div className="py-4 space-y-4">
				<p>
					The window is too small for the editor to fit. Please make it bigger
					if you can.
				</p>
				<p>Sorry, the editor doesn&apos;t work on phones or small tablets.</p>
			</div>
		</div>
	);
}

export { TooSmall };
