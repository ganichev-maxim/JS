(function() {
  // Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
  const studentsList = [
    // Добавьте сюда объекты студентов
    {name: 'Иван', lastName: 'Иванишин', middleName: 'Петрович', birthDate: new Date('2000-02-04'), admissionYear: 2001, faculty: 'ФЭЭ'},
    {name: 'Павел', lastName: 'Терсков', middleName: 'Сергеевич', birthDate: new Date('2001-04-12'), admissionYear: 2002, faculty: 'ФАО'},
    {name: 'Игорь', lastName: 'Говорухин', middleName: 'Павлович', birthDate: new Date('2002-08-01'), admissionYear: 2003, faculty: 'ФЭП'},
    {name: 'Ирина', lastName: 'Стулова', middleName: 'Максимовна', birthDate: new Date('2003-09-10'), admissionYear: 2004, faculty: 'ФЭЭ'},
    {name: 'Александра', lastName: 'Мухова', middleName: 'Дмитриевна', birthDate: new Date('2004-01-21'), admissionYear: 2005, faculty: 'ФЭП'},
  ];

  let studentListContainer;
  let sortProperty;
  let filters;
  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  function getStudentItem(studentObj) {
    function createCell(content) {
      let cell = document.createElement('td');
      cell.innerText = content;
      return cell;
    }

    function calcAge(birthDate) {
      let diff = Date.now() - birthDate.getTime();
      return Math.abs(new Date(diff).getUTCFullYear() - 1970);
    }

    function getCourse(startYear) {
      let now = new Date();
      let result = now.getFullYear() - startYear;
      if (now.getMonth() >= 8) {
        result++;
      }
      if (result <= 0) {
        return 'Не начал';
      } else if (result <= 4) {
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

    let studentItem = document.createElement('tr');
    studentItem.append(createCell(studentObj.fullName));
    studentItem.append(createCell(studentObj.faculty));
    let date = studentObj.birthDate;
    studentItem.append(createCell(`${pad(date.getDate(),2)}.${pad(date.getMonth() + 1, 2)}.${date.getFullYear()} (${calcAge(date)} лет)`));
    let year = studentObj.admissionYear;
    studentItem.append(createCell(`${studentObj.admissionYear}-${studentObj.graduateYear} (${getCourse(year)})`));
    return studentItem;
  }

  function prepareForRender(studentsArray) {
    let result = [];
    for (const studentObj of studentsArray) {
      result.push({
        fullName: `${studentObj.lastName} ${studentObj.name} ${studentObj.middleName}`,
        faculty: studentObj.faculty,
        birthDate: studentObj.birthDate,
        admissionYear: studentObj.admissionYear,
        graduateYear: studentObj.admissionYear + 4
      })
    }
    return result;
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
  function renderStudentsTable(studentsArray) {
    studentListContainer.innerHTML = '';
    for (const studentObj of studentsArray) {
      studentListContainer.append(getStudentItem(studentObj));
    }
  }

  function simpleRenderStudentTable(studentsArray) {
    renderStudentsTable(prepareForRender(studentsArray));
  }

  function filteredAndSortedRenderStudentTable(studentsArray) {
    let studentsForView = prepareForRender(studentsArray);
    if (filters) {
      for (const filter of filters) {
        studentsForView = filterStudents(studentsForView, filter.prop, filter.value, filter.method);
      }
    }
    if (sortProperty) {
      studentsForView = sortStudents(studentsForView, sortProperty);
    }
    renderStudentsTable(studentsForView);
  }

  function sortStudents(studentsArray, prop, desc = false) {
    return studentsArray.sort((s1, s2) => {
      return (desc ? s1[prop] > s2[prop] : s1[prop] < s2[prop]) ? -1 : 1;
    })
  }

  function filterStudents(studentsArray, prop, value, method) {
    let result = [];
    for (const student of studentsArray) {
      let condition = String(student[prop]).includes(value);
      if (method) {
        if (method === 'strict') {
          condition = String(student[prop]) === value;
        }
      }
      if (condition) {
        result.push(student);
      }
    }
    return result;
  }

  window.addEventListener('DOMContentLoaded', function() {
    console.log(sortStudents(studentsList,'lastName', true));
    studentListContainer = this.document.getElementById('students-list');

    simpleRenderStudentTable(studentsList);

    let validationResults = document.getElementById('validationResults');
    this.document.getElementById('students__add-form').addEventListener('submit', function(event) {
      resetValidationResult(this);
      validateAddStudentForm(this);
      let isFormValid = this.checkValidity();
      if (!isFormValid) {
        this.classList.add('was-validated');
        showValidationMessage(this);
        event.stopPropagation();
      }
      else {
        // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
        studentsList.push({
          name: document.getElementById('studentName').value,
          lastName: document.getElementById('studentLastName').value,
          middleName: document.getElementById('studentMiddleName').value,
          birthDate: document.getElementById('studentBirthDay').valueAsDate,
          admissionYear: parseInt(document.getElementById('studentAdmissionYear').value),
          faculty: document.getElementById('studentFaculty').value
        });
        filteredAndSortedRenderStudentTable(studentsList);
        this.classList.remove('was-validated');
        this.reset();
      }
      event.preventDefault();

      function resetValidationResult(form) {
        let inputs = form.querySelectorAll('input');
        for (const input of inputs) {
          input.setCustomValidity("");
        }
      }

      function validateAddStudentForm(form) {
        validateRequiredFileds();
        validateBirthDate();
        validateStudentAdmissionYearInput();

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

        function validateRequiredFileds() {
          let requiredInputs = form.querySelectorAll('input[required]');
          for (const requieredInput of requiredInputs) {
            if (!requieredInput.value || requieredInput.value.trim().length === 0) {
              requieredInput.setCustomValidity("Обязательно для заполнения");
            }
          }
        }
      }

      function showValidationMessage(form) {
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
    });

    this.document.getElementById('students__add').addEventListener('mouseleave', function(event) {
      validationResults.style.display = 'none';
    });

    // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
    this.document.getElementById('tableFullName').addEventListener('click', function(event) {
      sortProperty = 'fullName';
      filteredAndSortedRenderStudentTable(studentsList);
    });

    this.document.getElementById('tableFaculty').addEventListener('click', function(event) {
      sortProperty = 'faculty';
      filteredAndSortedRenderStudentTable(studentsList);
    });

    this.document.getElementById('tableBirthDate').addEventListener('click', function(event) {
      sortProperty = 'birthDate';
      filteredAndSortedRenderStudentTable(studentsList);
    });

    this.document.getElementById('tableLearnPeriod').addEventListener('click', function(event) {
      sortProperty = 'admissionYear';
      filteredAndSortedRenderStudentTable(studentsList);
    });

    // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
    this.document.getElementById('filterForm').addEventListener('submit', function(event) {
      event.preventDefault();
      filters = [];
      if (document.getElementById('studentNameFilter').value) {
        filters.push({prop: 'fullName', value: document.getElementById('studentNameFilter').value});
      }

      if (document.getElementById('studentFacultyFilter').value) {
        filters.push({prop: 'faculty', value: document.getElementById('studentFacultyFilter').value});
      }

      if (document.getElementById('studentAdmissionYearFilter').value) {
        filters.push({prop: 'admissionYear', value: document.getElementById('studentAdmissionYearFilter').value, method: 'strict'});
      }

      if (document.getElementById('studentGraduationYearFilter').value) {
        filters.push({prop: 'graduateYear', value: document.getElementById('studentGraduationYearFilter').value, method: 'strict'});
      }
      filteredAndSortedRenderStudentTable(studentsList);
    });
  }, false);
})();
