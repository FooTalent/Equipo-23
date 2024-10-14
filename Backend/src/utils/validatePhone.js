import { countryPhonePatterns } from "./prefixPatternPhone.js";
export const validatePhoneNumber = (phoneNumber) => {
  for (const country in countryPhonePatterns) {
    const { prefix, pattern } = countryPhonePatterns[country];
    if (phoneNumber.startsWith(prefix) && pattern.test(phoneNumber)) {
      return true;
    }
  }
  return false;
}
