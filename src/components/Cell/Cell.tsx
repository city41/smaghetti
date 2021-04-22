import React, { CSSProperties, forwardRef, RefObject, memo } from 'react';
import clsx from 'clsx';

import { TILE_SIZE } from '../../tiles/constants';
import focusedStyles from '../../styles/focused.module.css';
import { detailsMap } from '../details';

import styles from './Cell.module.css';
import { EntityType } from '../../entities/entityMap';

type CellProps = {
	className?: string;
	ref?: RefObject<HTMLDivElement> | null;
	id?: number;
	type: EntityType;
	scale?: number;
	style?: CSSProperties;
	top?: number;
	left?: number;
	animateIn?: boolean;
	focused?: boolean;
	settings?: EntitySettings;
	onEntitySettingsChange?: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
	opacity?: number;
	onClick?: () => void;
};

const Cell = memo(
	forwardRef<HTMLDivElement, CellProps>(function Tile(
		{
			className,
			id,
			type,
			scale = 1,
			style = {},
			top,
			left,
			animateIn,
			focused,
			settings,
			onEntitySettingsChange,
			opacity = 1,
			onClick,
		}: CellProps,
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

		const showingDetailsEditPane =
			focused && !!detailsMap[type]?.edit && !!settings;

		let detailsEdit = null;
		let detailsView = null;
		//
		if (
			focused &&
			detailsMap[type]?.edit &&
			!!settings &&
			onEntitySettingsChange &&
			id
		) {
			const DetailsEditComponent = detailsMap[type]!.edit;

			detailsEdit = (
				// @ts-ignore does not have any construct or call signatures???
				<DetailsEditComponent
					settings={settings ?? {}}
					onEntitySettingsChange={(settings: EntitySettings) => {
						onEntitySettingsChange({ id, settings });
					}}
				/>
			);
		}

		if (detailsMap[type]?.view && id && settings) {
			const DetailsViewComponent = detailsMap[type]!.view;

			// @ts-ignore does not have any construct or call signatures???
			detailsView = <DetailsViewComponent settings={settings ?? {}} />;
		}

		const finalClassName = clsx(className, styles.root, {
			[styles.animateIn]: animateIn,
			[focusedStyles.focused]: focused && !detailsEdit,
			'z-10': showingDetailsEditPane,
			'border-2 border-dashed border-green-300 bg-green-50':
				type === 'HiddenBlock',
		});

		return (
			<div
				ref={ref}
				className={finalClassName}
				style={finalStyle}
				data-tiletype={type}
				data-editor-type="tile"
				onClick={onClick}
			>
				<div className={`${type}-bg w-full h-full bg-cover`} />
				{detailsView}
				{detailsEdit}
			</div>
		);
	})
);

Cell.displayName = 'Tile';

export { Cell };
export type { CellProps };
