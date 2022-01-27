import React, { useState } from 'react';
import { Button } from '../../../Button';

function ObjectPriorities() {
	const [, setRenderCount] = useState(0);

	function handleSetObjectPriorities() {
		// @ts-ignore
		window.smaghettiObjectPriorities = !window.smaghettiObjectPriorities;
		setRenderCount((rc) => rc + 1);
	}

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Object Priorities</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>
					Enable object priorities. This is experimental for now as need to see
					the impact it has on existing levels before making it standard.
				</p>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={handleSetObjectPriorities}>
					{
						// @ts-ignore
						window.smaghettiObjectPriorities
							? 'disable priorities'
							: 'enable priorities'
					}
				</Button>
			</div>
		</div>
	);
}

export { ObjectPriorities };
