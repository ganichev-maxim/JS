function filter(objects, property, propertyValue) {
  let result = [];
  for (const object of objects) {
    if (object[property] === propertyValue) {
      result.push(object);
    }
  }
  return result;
}

let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' }
 ]

let result = filter(objects, 'name', 'Иван');

console.log(result);
