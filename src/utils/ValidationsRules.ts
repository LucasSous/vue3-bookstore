const invalidEmail = (value: string) => {
  if (/.+@.+\..+/.test(value)) return true;
  return 'E-mail inválido';
};

const invalidValue = (value: string) => {
  if (/[a-zA-ZÀ-ú]+$/.test(value)) return true;
  return 'Valor inválido';
};

const invalidValueWithSpaces = (value: string) => {
  if (/^[a-zA-ZÀ-ú ]+$/.test(value)) return true;
  return 'Valor inválido';
};

const maxCharacters = (value: string, maxCharacters: number) => {
  if (value.length <= maxCharacters) return true;
  return `A quantidade máxima de caracteres é de ${maxCharacters}`;
};

const minCharacters = (value: string, minCharacters: number) => {
  if (value.length >= minCharacters) return true;
  return `A quantidade mínima de caracteres é de ${minCharacters}`;
};

const requiredValue = (value: string) => {
  if (value) return true;
  return 'Valor obrigatório';
};

const spacesAtTheStart = (value: string) => {
  if (/^[^-\s]/.test(value)) return true;
  return 'Valor não deve conter espaços no início';
};

export {
  invalidEmail,
  invalidValue,
  invalidValueWithSpaces,
  maxCharacters,
  minCharacters,
  requiredValue,
  spacesAtTheStart,
};
