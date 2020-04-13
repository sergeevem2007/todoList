'use strict';
let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

let render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    let li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value +'</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }
    
    let btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });
  });
};

todoControl.addEventListener('submit' , function(event) {
  event.preventDefault();

  let newTodo = {
    value: headerInput.value,
    completed: false
  };
  todoData.push(newTodo);

  render();
});

render();