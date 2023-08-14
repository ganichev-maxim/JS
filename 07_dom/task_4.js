function createStudentsList(listArr) {
  let studentList = document.createElement('ul');
  for (const student of listArr) {
    let studentItem = createStudentCard(student);
    studentList.append(studentItem);
  }
  document.body.append(studentList);
}

function createStudentCard(student) {
  let studentCard = document.createElement('li');

  let studentName = document.createElement('h2');
  studentName.textContent = student.name;
  studentCard.append(studentName);

  let studentAge = document.createElement('span');
  studentAge.textContent = `Возраст: ${student.age} лет`;
  studentCard.append(studentAge);
  return studentCard;
}

let studentListVisible = false;
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector('.show-list-button')
          .addEventListener('click',
            function() {
              if (!studentListVisible) {
                let allStudents=[
                  {name: 'Валя', age: 11},
                  {name: 'Таня',age: 24},
                  {name: 'Рома',age: 21},
                  {name: 'Надя', age: 34},
                  {name: 'Антон', age: 7}
                ]

                createStudentsList(allStudents);
                studentListVisible = true;
              }
            });
});
