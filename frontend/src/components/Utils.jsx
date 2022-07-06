// GET LONG DATE-HOURS LOCAL
export function dateParser(dateString) {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    seconde: "2-digit",
    weekday: "long",
    years: "numeric",
    month: "short",
    day: "numeric",
  };
  let timestamp = Date.parse(dateString);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.toString();
}

// GET LOCAL DATE
export function getDate(dateString) {
  let date = new Date(dateString).toLocaleDateString("fr-FR");
  return date.toString();
}

// CONVERT DATE IN 'YYYY-MM-DD' FORMAT
export function getDateUTC(dateString) {
  var MyDate = new Date(dateString);
  var MyDateString;

  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);
  return MyDateString;
}

// GET AGE WITH DATE
export function getAge(dateString) {
  var age = new Date().getFullYear() - new Date(dateString).getFullYear();
  var month = new Date().getMonth() - new Date(dateString).getMonth();
  if (
    month < 0 ||
    (month === 0 && new Date().getDate() < new Date(dateString).getDate())
  ) {
    age--;
  }
  return age.toString();
}
