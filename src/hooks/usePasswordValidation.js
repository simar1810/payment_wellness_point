import { useState } from "react";

const usePasswordValidation = () => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValidation({
      length,
      lowercase,
      uppercase,
      specialChar,
    });
  };

  return { passwordValidation, validatePassword };
};

export default usePasswordValidation;
