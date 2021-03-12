import React, {
	FunctionComponent,
	CSSProperties,
	forwardRef,
	RefObject,
	memo,
} from 'react';
import clsx from 'clsx';

import { getResourceUrl } from '../../resources';
import {
	TILE_TYPE_COUNT,
	TILE_SIZE,
	TileHasEntityType,
} from '../../tiles/constants';
// import { focused } from '../../../styles/focused';
// import { detailsPanes } from '../../../entities/components/detailsPanes';
import { getTileType } from '../../tiles/util';

type TileProps = {
	className?: string;
	ref?: RefObject<HTMLDivElement> | null;
	id?: number;
	tileIndex: number;
	scale?: number;
	style?: CSSProperties;
	top?: number;
	left?: number;
	animateIn?: boolean;
	focused?: boolean;
	soleGroupFocused?: boolean;
	settings?: EntitySettings;
	onEntitySettingsChange?: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
	opacity?: number;
	onClick?: () => void;
};

// const spawn = keyframes`
//   0% {
//     transform: scale(0);
//   }
//   75% {
//     transform: scale(1);
//   }
//   90% {
//     transform: scale(1.15);
//   }
// `;
//
// const Container = styled.div`
// 	background-image: url(${getResourceUrl('tiles')});
//
// 	&.animateIn {
// 		animation: ${spawn} 0.2s ease-in;
// 	}
//
// 	z-index: 10;
//
// 	&.showingDetailsEditPane {
// 		z-index: 100;
// 	}
//
// 	${focused}
// `;

const Tile = memo(
	forwardRef<HTMLDivElement, TileProps>(function Tile(
		{
			className,
			id,
			tileIndex,
			scale = 1,
			style = {},
			top,
			left,
			animateIn,
			focused,
			soleGroupFocused,
			settings,
			onEntitySettingsChange,
			opacity = 1,
			onClick,
		}: TileProps,
		ref
	) {
		const xPos =
			((tileIndex % TILE_TYPE_COUNT || TILE_TYPE_COUNT) - 1) *
			-TILE_SIZE *
			scale;
		const yPos =
			Math.floor((tileIndex - 1) / TILE_TYPE_COUNT) * -TILE_SIZE * scale;

		const backgroundSizeStyle =
			scale === 1 ? {} : { backgroundSize: `${TILE_TYPE_COUNT * 100}%` };

		const leftStyle =
			typeof left === 'number' ? ({ position: 'absolute', left } as const) : {};
		const topStyle =
			typeof top === 'number' ? ({ position: 'absolute', top } as const) : {};

		const opacityStyle = { opacity };

		const finalStyle = {
			...style,
			...backgroundSizeStyle,
			...leftStyle,
			...topStyle,
			...opacityStyle,
			backgroundPositionX: xPos,
			backgroundPositionY: yPos,
			width: TILE_SIZE * scale,
			height: TILE_SIZE * scale,
		};

		const tileType = getTileType(tileIndex) as TileHasEntityType;

		// const showingDetailsEditPane =
		// 	soleGroupFocused && !!detailsPanes[tileType]?.edit && !!settings;
		const finalClassName = clsx(className, {
			animateIn,
			focused,
			// showingDetailsEditPane,
		});

		// let detailsEdit = null;
		// let detailsView = null;
		//
		// if (
		// 	soleGroupFocused &&
		// 	detailsPanes[tileType]?.edit &&
		// 	!!settings &&
		// 	onEntitySettingsChange &&
		// 	id
		// ) {
		// 	const DetailsEditComponent = detailsPanes[tileType]!.edit;
		//
		// 	detailsEdit = (
		// 		// @ts-ignore does not have any construct or call signatures???
		// 		<DetailsEditComponent
		// 			settings={settings ?? {}}
		// 			onEntitySettingsChange={(settings: EntitySettings) => {
		// 				onEntitySettingsChange({ id, settings });
		// 			}}
		// 		/>
		// 	);
		// }

		// if (detailsPanes[tileType]?.view && id && settings) {
		// 	const DetailsViewComponent = detailsPanes[tileType]!.view;
		//
		// 	detailsView = (
		// 		// @ts-ignore does not have any construct or call signatures???
		// 		<DetailsViewComponent settings={settings ?? {}} />
		// 	);
		// }

		return (
			<div
				ref={ref}
				className={finalClassName}
				style={finalStyle}
				data-tileid={tileIndex}
				data-editor-type="tile"
				onClick={onClick}
			>
				{/*{detailsView}*/}
				{/*{detailsEdit}*/}
			</div>
		);
	})
);

Tile.displayName = 'Tile';

export { Tile };
export type { TileProps };
