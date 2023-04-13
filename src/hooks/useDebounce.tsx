import {useEffect, useRef, useState} from 'react';

export const useDebounce = (input: string = '', time: number = 500) => {
  const [debounce, setDebounce] = useState(input);
  const timeStatic = useRef(time);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(input);
    }, timeStatic.current);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return {
    debounce,
  };
};
