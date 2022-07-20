// GET NAME BY ID
export function getNameById(userId, usersData) {
  const user = usersData.find((object) => {
    return object._id === userId;
  });
  return user.firstname + " " + user.lastname;
}

export function getInfoById(userId, usersData) {
  const user = usersData.find((object) => {
    return object._id === userId;
  });
  if (user.age && user.job) return `${getAge(user.age)} ans | ${user.job}`;
  if (user.age) return `${getAge(user.age)} ans`;
  if (user.job) return `${user.job}`;
  else return null;
}

// GET LONG DATE-HOURS LOCAL
export function dateParser(dateInfo) {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    seconde: "2-digit",
    weekday: "long",
    years: "numeric",
    month: "short",
    day: "numeric",
  };
  if (isNaN(dateInfo)) {
    dateInfo = Date.parse(dateInfo);
  }

  let date = new Date(dateInfo).toLocaleDateString("fr-FR", options);
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

// IS EMPTY
export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

// IS AUTHOR
export function isAuthor(userData, posterId) {
  if (userData._id === posterId || userData.role === "ADMIN") return true;
  else return false;
}
