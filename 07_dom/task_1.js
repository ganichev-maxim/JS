function createStudentCard(name, age) {
  let studentCard = document.createElement('div');

  let studentName = document.createElement('h2');
  studentName.textContent = name;
  studentCard.append(studentName);

  let studentAge = document.createElement('span');
  studentAge.textContent = `Возраст: ${age} лет`;
  studentCard.append(studentAge);

  document.body.append(studentCard);
}

document.addEventListener("DOMContentLoaded", (event) => {
  createStudentCard('Игорь', 17);
});
