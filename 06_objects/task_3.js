let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' }
]


function filter(arr, prop, value) {
  let result = [];
  for (const object of arr) {
    if (object[prop] === value) {
      result.push(object);
    }
  }
  return result;
}

let result = filter(objects, 'name', 'Иван');
console.log(result);
