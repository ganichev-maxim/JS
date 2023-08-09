function normalizeUsername(userName, userSurname) {
  if (typeof userName === 'string' && typeof userSurname === 'string') {
    let normalizeUsername = firstUpperOtherLower(userName);
    let normalizeSurname = firstUpperOtherLower(userSurname);
    console.log(`User name: ${normalizeUsername}`);
    console.log(`User surname: ${normalizeSurname}`);
    userName !== normalizeUsername ? console.log('Имя было преобразовано') : console.log('Имя осталось без изменений');
    userSurname !== normalizeSurname ? console.log('Фамилия была преобразована') : console.log('Фамилия осталась без изменений');
  }
  else {
    throw new Error('Parameters is not a string!');
  }
}

function firstUpperOtherLower(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

normalizeUsername('Дима', 'Попов');
normalizeUsername('ИГоРь', 'кОт');

