function createStudentCard(student) {
  let studentCard = document.createElement('div');

  let studentName = document.createElement('h2');
  studentName.textContent = student.name;
  studentCard.append(studentName);

  let studentAge = document.createElement('span');
  studentAge.textContent = `Возраст: ${student.age} лет`;
  studentCard.append(studentAge);

  document.body.append(studentCard);
}

document.addEventListener("DOMContentLoaded", (event) => {
  let studentObj = {
    name: 'Игорь',
    age: 17
  };

  createStudentCard(studentObj);
});
