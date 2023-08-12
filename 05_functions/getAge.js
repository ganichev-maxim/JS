function getAge(birthYear) {
  let currentYear = new Date().getFullYear()
  return currentYear - birthYear;
}

console.log(getAge(1998));
console.log(getAge(1991));
console.log(getAge(2007));