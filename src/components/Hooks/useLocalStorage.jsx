import { useState, useEffect } from 'react';
import { save, load } from '../Utils/Utils';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => load(key) ?? defaultValue);

  useEffect(() => {
    save(key, state);
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;