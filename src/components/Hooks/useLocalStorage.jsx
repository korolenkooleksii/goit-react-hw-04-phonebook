import { useState, useEffect } from 'react';
import { save, load } from '../Utils/Utils';

const useLocalStorage = (key, defaultValue) => {
  const [contacts, setContacts] = useState(() => load(key) ?? defaultValue);

  useEffect(() => {
    save(key, contacts);
  }, [contacts, key]);

  return [contacts, setContacts];
};

export default useLocalStorage;