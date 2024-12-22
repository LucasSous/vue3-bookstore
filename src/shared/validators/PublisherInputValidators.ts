import {
  invalidValue,
  invalidValueWithSpaces,
  maxCharacters,
  minCharacters,
  requiredValue,
  spacesAtTheStart,
} from './ValidationsRules';

class PublisherInputValidators {
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

export default PublisherInputValidators;
