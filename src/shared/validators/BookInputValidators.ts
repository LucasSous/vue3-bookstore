import {
  invalidValue,
  invalidValueWithSpaces,
  maxCharacters,
  minCharacters,
  requiredValue,
  spacesAtTheStart,
  onlyNumbers,
  largerThanZero,
} from './ValidationsRules';

class BookInputValidators {
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

  static validateAutor = () => {
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

  static validatePublisher = () => {
    const nameRules = [requiredValue];
    return nameRules;
  };

  static validateQuantity = () => {
    const nameRules = [
      requiredValue,
      onlyNumbers,
      largerThanZero,
      spacesAtTheStart,
    ];
    return nameRules;
  };

  static validateLaunchYear = () => {
    const nameRules = [
      requiredValue,
      onlyNumbers,
      largerThanZero,
      spacesAtTheStart,
      (value: string) => maxCharacters(value, 4),
      (value: string) => minCharacters(value, 4),
    ];
    return nameRules;
  };
}

export default BookInputValidators;
