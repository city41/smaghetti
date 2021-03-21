import React, { CSSProperties, forwardRef, RefObject, memo } from 'react';
import clsx from 'clsx';

import {
	TILE_TYPE_COUNT,
	TILE_SIZE,
	TileHasEntityType,
	FIRST_TILE_INDEX_TO_TILE_TYPE_MAP,
	TileType,
} from '../../tiles/constants';
// import { focused } from '../../../styles/focused';
// import { detailsPanes } from '../../../entities/components/detailsPanes';
import { getTileType } from '../../tiles/util';

import styles from './Tile.module.css';

type TileProps = {
	className?: string;
	ref?: RefObject<HTMLDivElement> | null;
	id?: number;
	tileType: TileType;
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

const Tile = memo(
	forwardRef<HTMLDivElement, TileProps>(function Tile(
		{
			className,
			id,
			tileType,
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
		const leftStyle =
			typeof left === 'number' ? ({ position: 'absolute', left } as const) : {};
		const topStyle =
			typeof top === 'number' ? ({ position: 'absolute', top } as const) : {};

		const opacityStyle = { opacity };

		const finalStyle = {
			...style,
			...leftStyle,
			...topStyle,
			...opacityStyle,
			backgroundPositionX: 0,
			backgroundPositionY: 0,
			backgroundSize: 'cover',
			width: TILE_SIZE * scale,
			height: TILE_SIZE * scale,
		};

		// const showingDetailsEditPane =
		// 	soleGroupFocused && !!detailsPanes[tileType]?.edit && !!settings;
		const finalClassName = clsx(className, styles.root, `${tileType}-bg`, {
			[styles.animateIn]: animateIn,
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
				data-tiletype={tileType}
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
