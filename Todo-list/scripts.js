const NewTodoInput = document.getElementById('newTodo')
const TodoList = document.getElementById('todoList')
const AddTodoButton = document.getElementById('addButton')

const AllTodo = JSON.parse(localStorage.getItem('ToDos')) || [];

console.log(AllTodo);
let NewTodo = ""
function renderTodo() {
    TodoList.innerHTML = ""
    AllTodo.forEach((todo, index) => {
        console.log(todo);
        NewTodo = document.createElement('li')
        NewTodo.className = "todo-item"
        NewTodo.innerHTML = `
            <input type="checkbox" id="todoDone${index}" ${todo.done ? 'checked' : ''}  onchange="toggleDone(${index})">
            <span>${todo.text}</span>
            <button id="deleteTodo" onclick="RemoveTodo(${index})">
               <img src="images/delete-512.png">
            </button>
            <button id="editTodo" onclick="EditTodo(${index})">
               <img src="images/pencil.png">
            </button>
            `
        TodoList.appendChild(NewTodo)
    });
}

function storeTodo() {
    let currentTodo = NewTodoInput.value
    if (currentTodo == "") {
        return alert("Please Enter a Todo")
    }
    AllTodo.push({ text: currentTodo, done: false })
    localStorage.setItem('ToDos', JSON.stringify(AllTodo))
}

function toggleDone(index) {
    AllTodo[index].done = !AllTodo[index].done
    localStorage.setItem('ToDos', JSON.stringify(AllTodo))
    renderTodo()
}

function RemoveTodo(index) {
    AllTodo.splice(index, 1)
    localStorage.setItem('ToDos', JSON.stringify(AllTodo))
    renderTodo()
}

function EditTodo(index) {
    const todo = AllTodo[index].text
    console.log(todo);
    AllTodo.splice(index, 1)
    NewTodoInput.value = todo
}

AddTodoButton.addEventListener('click', () => {
    storeTodo()
    NewTodoInput.value = ""
    renderTodo()
})

NewTodoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        storeTodo();
        NewTodoInput.value = ""
        renderTodo()
    }
});

renderTodo()
