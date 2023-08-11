function checkPassword(password) {
  let requiredChars = ['-', '_'];
  if (typeof password === 'string' && password.length >= 4 && requiredChars.some(el => password.includes(el))) {
    console.log('Пароль надёжный');
  }
  else {
    console.log('Пароль недостаточно надёжный');
  }
}

checkPassword('1234-');
checkPassword('4321_');
checkPassword('qaz-xsw');
checkPassword('_zxd');
checkPassword('_-a');
checkPassword('qaz');
checkPassword('_-3');
checkPassword('123456789');
