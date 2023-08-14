(function() {
  let storageName;
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(id, name, done = false) {
    let item = document.createElement('li');
    if (done) {
      item.classList.toggle('list-group-item-success');
    }

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    item.setAttribute('data-id', id);

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    doneButton.addEventListener('click', function() {
      item.classList.toggle('list-group-item-success');
      markTodoItemDone(item.getAttribute('data-id'), item.classList.contains('list-group-item-success'));
    });
    deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        deleteTodoItem(item.getAttribute('data-id'));
        item.remove();
      }
    })

    return {item, doneButton, deleteButton};
  }

  function createTodoApp(container, title = 'Список дел', listName = 'todos') {
    storageName = listName;
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    restore(todoList);

    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let savedId = addTodoItem(todoItemForm.input.value, false);
      let todoItem = createTodoItem(savedId, todoItemForm.input.value);
      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      enableDisableButtonOnInputValue(todoItemForm.button, todoItemForm.input);
    });

    todoItemForm.input.addEventListener('input', function(event) {
      enableDisableButtonOnInputValue(todoItemForm.button, event.target);
    })
  }

  function restore(todoList) {
    let savedTodoItems = getSavedTodoItems(storageName);
    if (savedTodoItems.length > 0) {
      for (const todo of savedTodoItems) {
        let todoItem = createTodoItem(todo.id, todo.name, todo.done);
        todoList.append(todoItem.item);
      }
    }
  }

  function enableDisableButtonOnInputValue(button, input) {
    if (input.value) {
      button.removeAttribute('disabled');
    }
    else {
      button.disabled = true;
    }
  }

  function addTodoItem(name, done) {
    let todos = getSavedTodoItems(storageName);
    let id = getMaxId(todos) + 1;
    todos.push({id, name, done});
    saveTodoItems(storageName, todos);
    return id;
  }

  function getMaxId(todos) {
    let maxId = 0;
    for (const todo of todos) {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    }
    return maxId;
  }

  function markTodoItemDone(id, done) {
    let todos = getSavedTodoItems(storageName);
    for (const todo of todos) {
      if (todo.id === +id) {
        todo.done = done;
        break;
      }
    }
    saveTodoItems(storageName, todos);
  }

  function deleteTodoItem(id) {
    let todos = getSavedTodoItems(storageName);
    for (const todoIndex in todos) {
      if (todos[todoIndex].id === +id) {
        todos.splice(todoIndex, 1);
        break;
      }
    }
    saveTodoItems(storageName, todos);
  }

  function saveTodoItems (key, todos) {
    localStorage.setItem(key, JSON.stringify(todos));
  }

  function getSavedTodoItems(key) {
    let todos = localStorage.getItem(key);
    return todos ? JSON.parse(todos) : [];
  }

  window.createTodoApp = createTodoApp;
}
)();
