import { useCallback, useState, Dispatch, SetStateAction } from "react";

export const useHover = (): [
  {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  },
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const [isHovering, setHover] = useState(false);
  const onMouseEnter = useCallback(() => setHover(true), []);
  const onMouseLeave = useCallback(() => setHover(false), []);

  return [
    {
      onMouseEnter,
      onMouseLeave,
    },
    isHovering,
    setHover,
  ];
};
