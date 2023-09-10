(function() {
  let studentListContainer;
  let sortProperty;
  let filter;
  const STUDY_LENGTH = 4;
  const SEPTEMBER = 8;

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
  function createCell(content) {
    let cell = document.createElement('td');
    cell.innerText = content;
    return cell;
  }

  function calcAge(birthday) {
    let diff = Date.now() - birthday.getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  }

  function getCourse(startYear) {
    let now = new Date();
    let result = now.getFullYear() - startYear;
    if (now.getMonth() >= SEPTEMBER) {
      result++;
    }
    if (result <= 0) {
      return 'Не начал';
    } else if (result <= STUDY_LENGTH) {
      return `${result} курс`;
    } else {
      return 'Закончил';
    }
  }

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  function getStudentItem(studentObj, {onDelete}) {
    let studentItem = document.createElement('tr');
    studentItem.append(createCell(studentObj.fullName));
    studentItem.append(createCell(studentObj.faculty));
    let date = studentObj.birthday;
    studentItem.append(createCell(`${pad(date.getDate(),2)}.${pad(date.getMonth() + 1, 2)}.${date.getFullYear()} (${calcAge(date)} лет)`));
    let year = studentObj.studyStart;
    studentItem.append(createCell(`${year}-${studentObj.graduateYear} (${getCourse(year)})`));
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить'
    deleteButton.classList.add('btn', 'btn-primary');
    deleteButton.addEventListener('click', function (event) {
      onDelete(studentObj, studentItem);
    })
    let buttonCell = document.createElement('td');
    buttonCell.append(deleteButton);
    studentItem.append(buttonCell);
    return studentItem;
  }

  function prepareForRender(studentsArray) {
    let result = [];
    for (const studentObj of studentsArray) {
      const studyStart = parseInt(studentObj.studyStart);
      result.push({
        id: studentObj.id,
        fullName: `${studentObj.lastname} ${studentObj.name} ${studentObj.surname}`,
        faculty: studentObj.faculty,
        birthday: new Date(studentObj.birthday),
        studyStart: studyStart,
        graduateYear: studyStart + STUDY_LENGTH
      })
    }
    return result;
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
  function renderStudentsTable(studentsArray, {onDelete}) {
    studentListContainer.innerHTML = '';
    for (const studentObj of studentsArray) {
      studentListContainer.append(getStudentItem(studentObj, {onDelete}));
    }
  }

  async function renderSordedStudentTable() {
    let studentsList = await getFilteredFromServer();
    let studentsForView = prepareForRender(studentsList);
    if (sortProperty) {
      studentsForView = sortStudents(studentsForView, sortProperty);
    }
    renderStudentsTable(studentsForView, {
      onDelete(studentObj, studentItem) {
        studentItem.remove();
        fetch(`http://localhost:3000/api/students/${studentObj.id}`, {
          method: 'DELETE'
        });
      }
    });
  }

  function sortStudents(studentsArray, prop, desc = false) {
    return studentsArray.sort((s1, s2) => {
      return (desc ? s1[prop] > s2[prop] : s1[prop] < s2[prop]) ? -1 : 1;
    })
  }

  async function getFilteredFromServer() {
    const response = await fetch('http://localhost:3000/api/students' + (filter ? `?search=${filter}` : ''));
    const studentList = await response.json();
    return studentList
  }

  function resetValidationResult(form) {
    let inputs = form.querySelectorAll('input');
    for (const input of inputs) {
      input.setCustomValidity("");
    }
  }

  function validateAddStudentForm(form) {
    validateRequiredFileds(form);
    validateBirthDate();
    validateStudentAdmissionYearInput();
  }

  function validateStudentAdmissionYearInput() {
    let studentAdmissionYearInput = document.getElementById('studentAdmissionYear');
    if (studentAdmissionYearInput.value) {
      if (studentAdmissionYearInput.value < 2000 || studentAdmissionYearInput.value > new Date().getFullYear()) {
        studentAdmissionYearInput.setCustomValidity('Год должен быть не меньше 2000 и не больше текущего');
      }
    }
  }

  function validateBirthDate() {
    let birthDateInput = document.getElementById('studentBirthDay');
    if (birthDateInput.value) {
      let minDate = new Date('1900-01-01');
      let birthDate = birthDateInput.valueAsDate;
      if (birthDate < minDate) {
        birthDateInput.setCustomValidity('Дата должна быть больше 1900-01-01');
      }
    }
  }

  function validateRequiredFileds(form) {
    let requiredInputs = form.querySelectorAll('input[required]');
    for (const requieredInput of requiredInputs) {
      if (!requieredInput.value || requieredInput.value.trim().length === 0) {
        requieredInput.setCustomValidity("Обязательно для заполнения");
      }
    }
  }

  function showValidationMessage(form, validationResults) {
    let errorText = 'Ошибки:\n';
    let inputs = form.querySelectorAll('input');
    for (const input of inputs) {
      if (!input.validity.valid) {
        let inputLabel = document.querySelector('label[for=\'' + input.id + '\']').textContent;
        errorText += `${inputLabel}: ${input.validationMessage}\n`;
      }
    }
    validationResults.innerText = errorText;
    validationResults.style.display = 'block';
  }

  window.addEventListener('DOMContentLoaded', function() {

    studentListContainer = this.document.getElementById('students-list');

    renderSordedStudentTable();

    let validationResults = document.getElementById('validationResults');
    this.document.getElementById('students__add-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      resetValidationResult(this);
      validateAddStudentForm(this);
      let isFormValid = this.checkValidity();
      if (!isFormValid) {
        this.classList.add('was-validated');
        showValidationMessage(this, validationResults);
        event.stopPropagation();
      }
      else {
        // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
        const response = await fetch('http://localhost:3000/api/students', {
          method: 'POST',
          body: JSON.stringify({
            name: document.getElementById('studentName').value,
            surname: document.getElementById('studentMiddleName').value,
            lastname: document.getElementById('studentLastName').value,
            birthday: document.getElementById('studentBirthDay').value,
            studyStart: document.getElementById('studentAdmissionYear').value,
            faculty: document.getElementById('studentFaculty').value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        renderSordedStudentTable();
        this.classList.remove('was-validated');
        this.reset();
      }
    });

    this.document.getElementById('students__add').addEventListener('mouseleave', function(event) {
      validationResults.style.display = 'none';
    });

    // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
    this.document.getElementById('tableFullName').addEventListener('click', function(event) {
      sortProperty = 'fullName';
      renderSordedStudentTable();
    });

    this.document.getElementById('tableFaculty').addEventListener('click', function(event) {
      sortProperty = 'faculty';
      renderSordedStudentTable();
    });

    this.document.getElementById('tableBirthDate').addEventListener('click', function(event) {
      sortProperty = 'birthday';
      renderSordedStudentTable();
    });

    this.document.getElementById('tableLearnPeriod').addEventListener('click', function(event) {
      sortProperty = 'studyStart';
      renderSordedStudentTable();
    });

    // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
    this.document.getElementById('filterForm').addEventListener('submit', function(event) {
      event.preventDefault();
      filter = document.getElementById('studentFilter').value;
      renderSordedStudentTable();
    });
  }, false);
})();
