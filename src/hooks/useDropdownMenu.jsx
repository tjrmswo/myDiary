import { useEffect, useState, useRef } from "react";

const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, ref, removeHandler];
};

export default useDropdownMenu;
