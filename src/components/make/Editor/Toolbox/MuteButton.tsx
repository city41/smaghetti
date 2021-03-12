import React, { FunctionComponent, useState } from 'react';

import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

import { IconButton } from '../../../components/iconButton';
import { SFX } from '../../../sfx';

type MuteButtonProps = {
  className?: string;
};

const MuteButton: FunctionComponent<MuteButtonProps> = ({ className }) => {
  const [isMuted, setMuted] = useState(false);

  const icon = isMuted ? FaVolumeMute : FaVolumeDown;

  return (
    <IconButton
      className={className}
      icon={icon}
      label="toggle sound"
      anchor="top"
      togglable
      toggled={isMuted}
      onClick={() => {
        setMuted(!isMuted);
        SFX.muted = !isMuted;
      }}
    />
  );
};

export { MuteButton, MuteButtonProps };
