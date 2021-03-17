import React, {
	FunctionComponent,
	useCallback,
	forwardRef,
	RefObject,
	CSSProperties,
	Ref,
} from 'react';
import clsx from 'clsx';

import { entityMap, EntityType } from '../../entities/entityMap_generated';
import { getResourceUrl, hasAResource } from '../../resources';
// import { focused } from '../../../styles/focused';
// import { detailsPanes } from '../detailsPanes';
import { getEntityOffset } from '../../entities/util';

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
	disableDrag?: boolean;
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
	return entityMap[entityType];
}

function getEntityWidth(entityType: EntityType): number {
	return getEntitySize(entityType).width;
}

function getEntityHeight(entityType: EntityType): number {
	return getEntitySize(entityType).height;
}

// const OuterContainer = styled.div`
//   cursor: pointer;
//
//   &.disableDrag {
//     cursor: initial;
//     pointer-events: none;
//   }
//
//   position: relative;
//   z-index: 10;
//
//   &.showingDetailsEditPane {
//     z-index: 100;
//     transform: scale(1.25);
//   }
//
//   ${focused}
// `;
//
// const EntityContainer = styled.div`
//   background-repeat: no-repeat;
//   transition: transform 0.2s;
//
//   position: absolute;
// `;

const Entity = forwardRef<HTMLDivElement, EntityProps>(
	(
		{
			className,
			id,
			type,
			settings,
			style,
			disableDrag,
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
		const imageUrl = (hasAResource(type) && getResourceUrl(type)) || '';

		// const showingDetailsEditPane = soleFocused && !!detailsPanes[type]?.edit;

		const finalClassName = clsx(className, {
			disableDrag,
			// showingDetailsEditPane: showingDetailsEditPane,
			focused: focused, // && !showingDetailsEditPane,
		});

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

		const offset = getEntityOffset(type);

		const outerWidthHeight = {
			width: (width + offset.x * 2) * scale,
			height: (height + offset.y * 2) * scale,
		};

		const entityWidthHeight = {
			width: width * scale,
			height: height * scale,
		};

		const offsetStyle = {
			top: offset.y * scale,
			left: offset.x * scale,
		};

		if (maxWidth && maxHeight) {
			outerWidthHeight.width = Math.min(maxWidth, outerWidthHeight.width);
			outerWidthHeight.height = Math.min(maxWidth, outerWidthHeight.height);

			entityWidthHeight.width = Math.min(maxWidth, entityWidthHeight.width);
			entityWidthHeight.height = Math.min(maxHeight, entityWidthHeight.height);
		}

		// let detailsEdit = null;
		// let detailsView = null;
		//
		// if (
		//   soleFocused &&
		//   detailsPanes[type]?.edit &&
		//   onEntitySettingsChange &&
		//   id
		// ) {
		//   const DetailsEditComponent = detailsPanes[type]!.edit;
		//
		//   detailsEdit = (
		//     // @ts-ignore does not have any construct or call signatures???
		//     <DetailsEditComponent
		//       settings={settings ?? {}}
		//       onEntitySettingsChange={(settings: EntitySettings) => {
		//         onEntitySettingsChange({ id, settings });
		//       }}
		//     />
		//   );
		// }
		//
		// if (detailsPanes[type]?.view && id) {
		//   const DetailsViewComponent = detailsPanes[type]!.view;
		//
		//   detailsView = (
		//     // @ts-ignore does not have any construct or call signatures???
		//     <DetailsViewComponent settings={settings ?? {}} />
		//   );
		// }

		// if (type === 'GreenKoopaTroopa') {
		// 	debugger;
		// }

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
					style={{
						...entityWidthHeight,
						...offsetStyle,
						...transformStyle,
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: `${backgroundWidth} ${backgroundHeight}`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						transformOrigin: 'center center',
						opacity,
					}}
				/>
				{/*{detailsView}*/}
				{/*{detailsEdit}*/}
			</div>
		);
	}
);

export { Entity };
export type { EntityProps };
