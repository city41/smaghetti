import React, { FunctionComponent } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { TiZoomIn, TiZoomOut } from 'react-icons/ti';

import { IconButton } from '../../../components/iconButton';
import { IconButtonGroup } from '../../../components/iconButton/IconButtonGroup';

type ZoomProps = {
  className?: string;
  onScaleIncreased: () => void;
  onScaleDecreased: () => void;
  canIncreaseScale: boolean;
  canDecreaseScale: boolean;
};

const Zoom: FunctionComponent<ZoomProps> = ({
  className,
  onScaleIncreased,
  onScaleDecreased,
  canIncreaseScale,
  canDecreaseScale,
}) => {
  useHotkeys('-', () => onScaleDecreased());
  useHotkeys('=,shift+=', () => onScaleIncreased());

  return (
    <IconButtonGroup className={className}>
      <IconButton
        label="zoom out (-)"
        anchor="top"
        icon={TiZoomOut}
        style={{ fontSize: 32 }}
        onClick={() => onScaleDecreased()}
        disabled={!canDecreaseScale}
      />
      <IconButton
        label="zoom in (+)"
        anchor="top"
        icon={TiZoomIn}
        style={{ fontSize: 32 }}
        onClick={() => onScaleIncreased()}
        disabled={!canIncreaseScale}
      />
    </IconButtonGroup>
  );
};

export { Zoom, ZoomProps };
