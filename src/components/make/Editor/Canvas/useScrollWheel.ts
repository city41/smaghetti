import { useEffect } from 'react';

type UseScrollWheelProps = {
  up: () => void;
  down: () => void;
  ref: HTMLDivElement | null;
};

const useScrollWheel = ({ up, down, ref }: UseScrollWheelProps) => {
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.deltaY > 0) {
        down();
      } else if (e.deltaY < 0) {
        up();
      }
    }

    ref?.addEventListener('wheel', handleWheel);

    return () => ref?.removeEventListener('wheel', handleWheel);
  }, [ref]);
};

export { useScrollWheel };
