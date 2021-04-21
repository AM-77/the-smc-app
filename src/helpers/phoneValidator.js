export function phoneValidator(phone) {
  const re = /(\+213|0)(\d){9}/;
  if (!phone) return "Phone can't be empty.";
  if (!re.test(phone)) return 'Ooops! We need a valid phone number.';
  return '';
}
