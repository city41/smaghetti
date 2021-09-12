import React from 'react';

type SectionPercentageProps = {
	sections: number;
	rom: number;
};

function SectionPercentage({ sections, rom }: SectionPercentageProps) {
	if (sections === 0) {
		return null;
	}

	return (
		<div className="p-4 text-center">
			{((sections / rom) * 100).toFixed(2)}% of ROM categorized
		</div>
	);
}

export { SectionPercentage };
