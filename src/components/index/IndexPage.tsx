import React from 'react';

function IndexPage() {
	return (
		<div className="w-full max-w-4xl mx-auto pt-8">
			<h1 className="text-2xl font-bold">Smaghetti</h1>
			<div className="space-y-4 py-4">
				<p>A level editor for Super Mario Advance 4</p>
				<p className="inline-block bg-red-100 text-red-900">
					Very early days, still tons of work to do.
				</p>
				<p>
					You can try it{' '}
					<a className="underline text-blue-700" href="/make">
						here
					</a>
				</p>
			</div>
		</div>
	);
}

export { IndexPage };
