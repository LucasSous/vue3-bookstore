import {
  invalidEmail,
  invalidValue,
  invalidValueWithSpaces,
  maxCharacters,
  minCharacters,
  requiredValue,
  spacesAtTheStart,
} from './ValidationsRules';

class UserInputValidators {
  static validateName = () => {
    const nameRules = [
      requiredValue,
      invalidValue,
      invalidValueWithSpaces,
      spacesAtTheStart,
      (value: string) => maxCharacters(value, 30),
      (value: string) => minCharacters(value, 3),
    ];

    return nameRules;
  };

  static validateEmail = () => {
    const emailRules = [requiredValue, invalidEmail, spacesAtTheStart];

    return emailRules;
  };

  static validateAdress = () => {
    const addressRules = [
      requiredValue,
      spacesAtTheStart,
      (value: string) => maxCharacters(value, 50),
      (value: string) => minCharacters(value, 5),
    ];

    return addressRules;
  };

  static validateCity = () => {
    const cityRules = [
      requiredValue,
      invalidValue,
      invalidValueWithSpaces,
      spacesAtTheStart,
      (value: string) => maxCharacters(value, 20),
      (value: string) => minCharacters(value, 3),
    ];

    return cityRules;
  };
}

export default UserInputValidators;
