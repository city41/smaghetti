import React from 'react';
import { Button } from '../../../../Button';

type InternalLoad1_1Props = {
	onClick: () => void;
};

function Load1_1({ onClick }: InternalLoad1_1Props) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Load 1-1</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>
					Load 1-1 into Smaghetti. It only loads the first room. This is very
					early and experimental, probably lots of bugs.
				</p>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={onClick}>Load 1-1</Button>
			</div>
		</div>
	);
}
export { Load1_1 };
