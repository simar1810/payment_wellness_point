import { useEffect } from "react";

const useOutsideClick = (ref, callback, ref2 = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (ref2 && ref2.current.contains(event.target)) {
          return;
        }
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;