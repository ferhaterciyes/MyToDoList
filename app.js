//! selectors
const todoInput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

//? alerts
const alertWarning = document.querySelector(".alert-warning");
const alertSucces = document.querySelector(".alert-succes");

//! events
document.addEventListener('DOMContentLoaded',function(){
    getTodos()
})
todobutton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
todoFilter.addEventListener("click", filterTodo);

//!functions
function addTodo(e) {
    e.preventDefault();

    const isEmpty = (str) => !str.trim().length;

    if (isEmpty(todoInput.value)) {
        // console.log('boşlık var');
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display = "none";
        }, 1500);
        /* ? clear todo input value */
        todoInput.value = "";
    } else {
        // console.log('yazı var');
        alertSucces.style.display = "block";
        setTimeout(() => {
            alertSucces.style.display = "none";
        }, 1500);

        saveLocalTodos(todoInput.value)
        //? create todo div

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        /* append to todo list */
        todoList.appendChild(todoDiv);

        todoDiv.innerHTML = `
    <button class="complete-btn">
        <i class="fas fa-check-circle"></i>
    </button>
       <li class="todo-item">${todoInput.value}</li>
    <button class="trash-btn">
       <i class="fa fa-minus-circle"></i>
    </button>
`;
        // const newTodo = document.querySelector(".todo-item");
        // newTodo.innerText = todoInput.value;
        // console.log(todoDiv);

        /* ? clear todo input value */
        todoInput.value = "";
    }
}

function deletecheck(e) {
    const item = e.target;
    // console.log(item);
    //? delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalStorage(todo)
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    //? check MArk
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = Array.from(todoList.childNodes); // NodeList'i bir diziye çevir
    todos.forEach(function (item) {
        if (item.nodeType === Node.ELEMENT_NODE) {
            // Sadece HTML öğelerini işle
            switch (e.target.value) {
                case "all":
                    item.style.display = "flex";
                    break;
                case "completed":
                    if (item.classList.contains("completed")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!item.classList.contains("completed")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                    break;
            }
        }
    });
}

//! local storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))

    }
    todos.forEach((todo)=>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        /* append to todo list */
        todoList.appendChild(todoDiv);

        todoDiv.innerHTML = `
    <button class="complete-btn">
        <i class="fas fa-check-circle"></i>
    </button>
       <li class="todo-item">${todo}</li>
    <button class="trash-btn">
       <i class="fa fa-minus-circle"></i>
    </button>
`;

    })

}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))

    }
const todoIndex = todo.children[1].innerText;
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem('todos',JSON.stringify(todos))
}


