import React, {
	useCallback,
	forwardRef,
	RefObject,
	CSSProperties,
	Ref,
} from 'react';
import clsx from 'clsx';
import { entityMap, EntityType } from '../../entities/entityMap';

import focusedStyles from '../../styles/focused.module.css';

import { detailsMap } from '../details';
import { isStaticResource } from '../../resources/util';

type EntityProps = {
	className?: string;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
	id?: number;
	style?: CSSProperties;
	type: EntityType;
	width?: number;
	height?: number;
	maxWidth?: number;
	maxHeight?: number;
	scale?: number;
	opacity?: number;
	tile?: number;
	angle?: number;
	flip?: boolean;
	onClick?: (id: number) => void;
	focused?: boolean;
	soleFocused?: boolean;
	settings?: EntitySettings;
	onEntitySettingsChange?: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
};

function getEntitySize(
	entityType: EntityType
): { width: number; height: number } {
	const entityDef = entityMap[entityType];

	if (entityDef.resource && isStaticResource(entityDef.resource)) {
		return {
			width: entityDef.resource.tiles[0].length * 8,
			height: entityDef.resource.tiles.length * 8,
		};
	} else {
		return { width: 0, height: 0 };
	}
}

function getEntityWidth(entityType: EntityType): number {
	return getEntitySize(entityType).width;
}

function getEntityHeight(entityType: EntityType): number {
	return getEntitySize(entityType).height;
}

const Entity = forwardRef<HTMLDivElement, EntityProps>(
	(
		{
			className,
			id,
			type,
			settings,
			style,
			opacity,
			onClick,
			width = getEntityWidth(type),
			height = getEntityHeight(type),
			maxWidth,
			maxHeight,
			scale = 1,
			tile = 0,
			angle = 0,
			flip = false,
			focused = false,
			soleFocused = false,
			onEntitySettingsChange,
		},
		ref
	) => {
		const showingDetailsEditPane =
			focused && !!detailsMap[type]?.edit && !!settings;

		const handleClick = useCallback(() => {
			onClick?.(id ?? -1);
		}, [onClick, id]);

		const transforms = [];

		if (flip) {
			transforms.push('scale(-1, 1)');
		}

		const rotateAngle = settings?.angle ?? angle ?? 0;
		if (rotateAngle) {
			transforms.push(`rotate(${rotateAngle}deg`);
		}

		const transformStyle =
			transforms.length === 0 ? {} : { transform: transforms.join(' ') };

		const outerWidthHeight = {
			width: width * scale,
			height: height * scale,
		};

		const entityWidthHeight = {
			width: width * scale,
			height: height * scale,
		};

		if (maxWidth && maxHeight) {
			outerWidthHeight.width = Math.min(maxWidth, outerWidthHeight.width);
			outerWidthHeight.height = Math.min(maxWidth, outerWidthHeight.height);

			entityWidthHeight.width = Math.min(maxWidth, entityWidthHeight.width);
			entityWidthHeight.height = Math.min(maxHeight, entityWidthHeight.height);
		}

		let detailsEdit = null;
		let detailsView = null;

		if (soleFocused && detailsMap[type]?.edit && onEntitySettingsChange && id) {
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

		if (detailsMap[type]?.view && id) {
			const DetailsViewComponent = detailsMap[type]!.view;

			detailsView = (
				// @ts-ignore does not have any construct or call signatures???
				<DetailsViewComponent settings={settings ?? {}} />
			);
		}

		let backgroundWidth, backgroundHeight;

		// if outer is square, this entity might be going into something like the palette,
		// scale it so it fits proportionately. For entities that are actually square,
		// this still ends up doing the right thing
		if (outerWidthHeight.width === outerWidthHeight.height) {
			const maxDimension = Math.max(width, height);
			const backgroundWidthNum = (width / maxDimension) * 100;
			const backgroundHeightNum = (height / maxDimension) * 100;
			backgroundWidth = `${backgroundWidthNum}%`;
			backgroundHeight = `${backgroundHeightNum}%`;
		} else {
			backgroundWidth = '100%';
			backgroundHeight = '100%';
		}

		const finalClassName = clsx(className, {
			'z-10': showingDetailsEditPane,
			[focusedStyles.focused]: focused && !detailsEdit,
		});

		return (
			<div
				style={{
					...style,
					...outerWidthHeight,
				}}
				onClick={handleClick}
				className={finalClassName}
				ref={ref}
				data-editor-type="entity"
				data-entity-type={type}
				data-entity-tile={tile}
			>
				<div
					className={`${type}-bg`}
					style={{
						...entityWidthHeight,
						...transformStyle,
						backgroundSize: `${backgroundWidth} ${backgroundHeight}`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						transformOrigin: 'center center',
						opacity,
					}}
				/>
				{detailsView}
				{detailsEdit}
			</div>
		);
	}
);

export { Entity, getEntitySize };
export type { EntityProps };
