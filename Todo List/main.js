//*main elements
const form = document.getElementById("todoAddForm");
const addinput = document.getElementById("todoName");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const clearButton = document.getElementById("clearButton");
const filterinput = document.getElementById("todoSearch");

//!bosstrap color changes
let danger = "danger";
let succes = "success"
let warning = "warning";


let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    cardBody2.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAll);
    filterinput.addEventListener("keyup", filter);

}

function filter(e) {
    const filterText = e.target.value.toLowerCase().trim();
    const todolistesi = document.querySelectorAll(".list-group-item");

    if (todolistesi.length > 0) {
        todolistesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterText)) {
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    } else {
        //?if you want add this part
        //showAlert(warning,"your text here");
    }


}

//remove all todos 
function removeAll() {
    const todoliste = document.querySelectorAll(".list-group-item");
    if (todoliste.length > 0) {
        //todo delete
        todoliste.forEach(function (todo) {
            todo.remove();
        });

        //todos delete to storage
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));

        showAlert(succes, "all todos have been deleted successfully!")
    } else {
        showAlert(warning, "There is no list to delete!");
    }

}


function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        //delete window todo
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //remove to storage
        removeTodoToStorage(todo.textContent);
        showAlert(succes, "todo deleted successfully");
    }

}


function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();//storage checker
    //delete to storage
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const inputext = addinput.value.trim();
    if (inputext == null || inputext == "") {
        //alert danger
        showAlert(danger, "Please enter a text!");
    } else {
        //UI part
        addTodoToUI(inputext);
        //add to storage
        addTodoStorage(inputext);
        //alert succes
        showAlert(succes, "Added successfully!");

    }

    e.preventDefault();
}
//add to UI
function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const i = document.createElement("i");

    li.className = "list-group-item d-flex justify-content-between mt-2";
    li.textContent = newTodo;

    a.href = "#";
    a.className = "delete-item";

    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addinput.value = "";
}
//add storage 
function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

//show to alert part
function showAlert(type, message) {
    let div = document.createElement("div");

    div.className = "alert alert-" + type + " mt-2";
    div.textContent = message;
    cardBody.appendChild(div);

    setTimeout(function () {

        div.remove();
    }, 2500);
}

