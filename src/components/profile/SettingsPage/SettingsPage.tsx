import React from 'react';
import { Button } from '../../Button';
import { Root } from '../../layout/Root';

type ProfilePageProps = {
	onClearRom: () => void;
};

function SettingsPage({ onClearRom }: ProfilePageProps) {
	return (
		<Root title="Settings" metaDescription="">
			<div className="max-w-2xl mx-auto pt-16">
				<div className="flex flex-row space-x-8 items-start">
					<Button onClick={onClearRom}>Clear the ROM</Button>
					<p className="w-72">
						You probably don&apos;t need to do this. This will delete
						Smaghetti&apos;s copy of the SMA4 ROM and require you to re-add it
						in order to use Smaghetti.
					</p>
				</div>
			</div>
		</Root>
	);
}

export { SettingsPage };
