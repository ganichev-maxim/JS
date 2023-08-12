function filter(whiteList, blackList) {
  const result = [];
  for (const email of whiteList) {
    if (!blackList.includes(email)) {
      result.push(email);
    }
  }
  return result;
}

// Массив с почтовыми адресами:
let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
// Массив с почтовыми адресами в чёрном списке:
let blackList = ['jsfunc@mail.ru','goodday@day.ru']
// Вызов созданной функции:
let result = filter(whiteList, blackList)
console.log(result);