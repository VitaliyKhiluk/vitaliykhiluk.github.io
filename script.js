const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = JSON.parse(localStorage.getItem('todos')) || []


function save() {
  localStorage.setItem('todos', JSON.stringify(todos))
}


function newTodo() {
  const text = prompt("Введіть нову справу:")
  if (!text) return

  const todo = {
    id: Date.now(),
    text,
    done: false
  }

  todos.push(todo)
  save()
  render()
}


function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id)
  save()
  render()
}


function checkTodo(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  )
  save()
  render()
}


function renderTodo(todo) {
  return `
    <li class="list-group-item d-flex align-items-center">
      
      <input type="checkbox" class="form-check-input me-2"
        ${todo.done ? "checked" : ""}
        onclick="checkTodo(${todo.id})">

      <label class="flex-grow-1">
        <span class="${todo.done ? 'text-success text-decoration-line-through' : ''}">
          ${todo.text}
        </span>
      </label>

      <button class="btn btn-danger btn-sm"
        onclick="deleteTodo(${todo.id})">
        delete
      </button>
    </li>
  `
}


function render() {
  list.innerHTML = todos.map(renderTodo).join("")
  updateCounters()
}


function updateCounters() {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(t => !t.done).length
}


render()
