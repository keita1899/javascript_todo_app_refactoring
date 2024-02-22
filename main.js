let todoIndex = 1
let todo = null

const todoContainer = document.getElementById('todo-container')
const todoInput = document.getElementById('todo-input')
const addButton = document.getElementById('add-button')
const deleteTodoButton = document.getElementById('delete-todo-button')

// ローカルストレージのデータを読み込む
const loadFromLocalStorage = () => {
  const storedTodo = localStorage.getItem('todo')
  const addButtonDisabled = localStorage.getItem('addButtonDisabled')
  const deleteTodoButtonDisabled = localStorage.getItem('deleteTodoButtonDisabled')

  todo = storedTodo ? JSON.parse(storedTodo) : null
  addButton.disabled = addButtonDisabled === 'true'
  deleteTodoButton.disabled = deleteTodoButtonDisabled === 'true'

}

// ローカルストレージにデータを保存する
const saveToLocalStorage = () => {
  localStorage.setItem('todo', JSON.stringify(todo))
  localStorage.setItem('addButtonDisabled', addButton.disabled)
}

// todoを追加する
const addTodo = () => {
  const todoText = todoInput.value.trim()
  if (todoText === '') return

  const newTodo = {
    id: todoIndex++,
    text: todoText,
    isCompleted: false
  }
  todo = newTodo
  todoInput.value = ''

  addButton.disabled = true
  deleteTodoButton.disabled = false

  saveToLocalStorage()
}

// todoを生成する
const createTodo = (todo) => {
  const div = document.createElement('div')
  div.classList.add('todo')
  div.setAttribute('id', 'todo')

  const completeButton = document.createElement('button')
  completeButton.setAttribute('type','button')
  completeButton.classList.add('complete-button')
  completeButton.setAttribute('id', 'complete-button')
  completeButton.textContent = '完了'

  const span = document.createElement('span')
  span.classList.add('todo-text')
  span.textContent = todo.text

  const editButton = document.createElement('button')
  editButton.setAttribute('type','button')
  editButton.classList.add('edit-button')
  editButton.textContent = '編集'

  div.append(completeButton, span, editButton)

  return div
}

const renderTodo = () => {
  todoContainer.innerHTML = ''
  if (todo) {
    const div = createTodo(todo)
    todoContainer.appendChild(div)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage()
  renderTodo()
})

// 保存ボタンをクリックしたとき
addButton.addEventListener('click', () => {
  addTodo()
  renderTodo()
})
