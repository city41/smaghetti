import React, { CSSProperties, Ref, RefObject } from 'react';
import clsx from 'clsx';
import { entityMap, EntityType } from '../../entities/entityMap';

import focusedStyles from '../../styles/focused.module.css';

type EntityProps = {
	className?: string;
	type: EntityType;
	scale?: number;
	id?: number;
	style?: CSSProperties;
	settings?: EditorEntitySettings;
	focused?: boolean;
	soleFocused?: boolean;
	dragging?: boolean;
	onEntitySettingsChange: (settings: EditorEntitySettings) => void;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
};

function Entity(props: EntityProps) {
	const {
		className,
		style,
		type,
		settings,
		focused,
		soleFocused,
		dragging,
		onEntitySettingsChange,
	} = props;
	const entityDef = entityMap[type];

	const entity = entityDef.render(
		!!soleFocused && !dragging,
		settings ?? {},
		onEntitySettingsChange
	);

	return (
		<div
			className={clsx(className, { [focusedStyles.focused]: focused })}
			style={style}
		>
			{entity}
		</div>
	);
}

export { Entity };
