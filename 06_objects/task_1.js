function getOlderUser(user1, user2) {
  return user1.age > user2.age ? user1.name : user2.name;
}

function getOlderUserArray(users) {
  let olderUser = users[0];
  for (const user of users) {
    if (user.age > olderUser.age) {
      olderUser = user;
    }
  }
  return olderUser.name;
}

let user1={
  name: 'Игорь',
  age: 17
 }
 let user2={
  name: 'Оля',
  age: 21
 }

 // Вызов созданной функции
let result = getOlderUser(user1, user2)
console.log(result);

let allUsers=[
  {name: 'Валя', age: 11},
  { name: 'Таня',age: 24},
  {name: 'Рома',age: 21},
  {name: 'Надя', age: 34},
  {name: 'Антон', age: 7}
 ]

 console.log(getOlderUserArray(allUsers));
