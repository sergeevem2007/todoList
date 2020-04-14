'use strict';
let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerButton = document.querySelector('.header-button');

let todoData = localStorage.todoData ? JSON.parse(localStorage.todoData) : [];

let render = function() {
  
  todoList.textContent = '';
  todoCompleted.textContent = '';
  localStorage.todoData = JSON.stringify(todoData);
  

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
    let btnTodoRemove = li.querySelector('.todo-remove');
      btnTodoRemove.addEventListener('click', function(){
        for (let i = 0; i < todoData.length; i++) {
          if (todoData[i] == item) {
            todoData.shift(todoData[i]);
          }
        }
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
  headerInput.value = '';
  headerButton.disabled = 'disabled';
  render();
});

headerButton.disabled = 'disabled';
headerInput.addEventListener('input' , function() {
  if (headerInput.value !== '') {
    headerButton.disabled = '';
  } 
});

render();