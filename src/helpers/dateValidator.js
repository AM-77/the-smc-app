export function dateValidator(date) {
  if (!date) return "Date can't be empty.";
  else {
    const parsedDate = Date.parse(date);
    if (!parsedDate) {
      return 'Invalid date format, try YYYY-MM-DD.';
    } else {
      const year = new Date(parsedDate).getFullYear();
      if (year < 1980) {
        return 'Please select a date after 1980-01-01.';
      } else {
        if (new Date(parsedDate) > new Date()) {
          return `Come on Dude! we still in ${new Date().getFullYear()}.`;
        }
      }
    }
  }
  return '';
}
