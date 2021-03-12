import { useEffect, useState } from 'react';

function useFirstRender() {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return firstRender;
}

export { useFirstRender };
