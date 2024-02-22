let todoIndex = 1
let todo = null
let completedTodos = []

const todoContainer = document.getElementById('todo-container')
const completedTodoList = document.getElementById('completed-todolist')
const todoInput = document.getElementById('todo-input')
const addButton = document.getElementById('add-button')
const completeButton = document.getElementById('complete-button')
const deleteTodoButton = document.getElementById('delete-todo-button')
const deleteAllButton = document.getElementById('delete-all-todo-button')

// ローカルストレージのデータを読み込む
const loadFromLocalStorage = () => {
  const storedTodo = localStorage.getItem('todo')
  const storedCompletedTodos = localStorage.getItem('completedTodos')
  const addButtonDisabled = localStorage.getItem('addButtonDisabled')
  const deleteTodoButtonDisabled = localStorage.getItem('deleteTodoButtonDisabled')
  const deleteAllButtonDisabled = localStorage.getItem('deleteAllButtonDisabled')

  todo = storedTodo ? JSON.parse(storedTodo) : null
  completedTodos = storedCompletedTodos ? JSON.parse(storedCompletedTodos) : []
  addButton.disabled = addButtonDisabled === 'true'
  deleteTodoButton.disabled = deleteTodoButtonDisabled === 'true'
  deleteAllButton.disabled = deleteAllButtonDisabled === 'true'
}

// ローカルストレージにデータを保存する
const saveToLocalStorage = () => {
  localStorage.setItem('todo', JSON.stringify(todo))
  localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
  localStorage.setItem('addButtonDisabled', addButton.disabled)
  localStorage.setItem('deleteTodoButtonDisabled', deleteTodoButton.disabled)
  localStorage.setItem('deleteAllButtonDisabled', deleteAllButton.disabled)
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

// todoを削除する
const deleteTodo = () => {
  todo = null
  deleteTodoButton.disabled = true
  addButton.disabled = false
  saveToLocalStorage()
}

// todoを編集する
const editTodo = () => {
  createEditForm(todo.text)
}

// todoを更新する
const updateTodo = () => {
  const updateTodoText = document.getElementById('edit-input').value.trim()
  if (updateTodoText === '') return

  todo.text = updateTodoText
  todoContainer.innerHTML = ''
  saveToLocalStorage()
  renderTodo()
}

// 編集フォームからtodoに戻す
const revertTodo = () => {
  todoContainer.innerHTML = ''
  renderTodo()
}

// todoを完了する
const completeTodo = () => {
  if (todo) {
    todo.isCompleted = true
    completedTodos.push(todo)
    deleteAllButton.disabled = false
    renderCompletedTodos()
    deleteTodo()
  }
}

// 完了したtodoを全て削除する
const deleteAllTodo = () => {
  completedTodos = []
  deleteAllButton.disabled = true
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
  completeButton.addEventListener('click', () => {
    completeTodo()
    renderTodo()
  })

  const span = document.createElement('span')
  span.classList.add('todo-text')
  span.textContent = todo.text

  const editButton = document.createElement('button')
  editButton.setAttribute('type','button')
  editButton.classList.add('edit-button')
  editButton.textContent = '編集'

  editButton.addEventListener('click', () => {
    editTodo()
  })

  div.append(completeButton, span, editButton)

  return div
}

const createCompletedTodo = (todo) => {
  const li = document.createElement('li')
  li.classList.add('completed-todo')

  const span = document.createElement('span')
  span.classList.add('todo-text')
  span.textContent = todo.text

  const deleteCompletedTodoButton = document.createElement('button')
  deleteCompletedTodoButton.setAttribute('type','button')
  deleteCompletedTodoButton.classList.add('delete-completed-todo-button')
  deleteCompletedTodoButton.textContent = '削除'

  li.append(span, deleteCompletedTodoButton)

  return li
}

// 編集フォームを生成してtodoと切り替える
const createEditForm = (todoText) => {
  const editInput = document.createElement('input')
  editInput.classList.add('edit-input')
  editInput.setAttribute('id', 'edit-input')
  editInput.value = todoText

  const updateButton = document.createElement('button')
  updateButton.setAttribute('type','button')
  updateButton.classList.add('update-button')
  updateButton.textContent = '更新'
  updateButton.addEventListener('click', () => {
    updateTodo()
  })

  const revertButton = document.createElement('button')
  revertButton.setAttribute('type','button')
  revertButton.classList.add('revert-button')
  revertButton.textContent = '戻す'
  revertButton.addEventListener('click', () => {
    revertTodo()
  })

  todoContainer.innerHTML = ''
  todoContainer.append(editInput, updateButton, revertButton)
}

const renderTodo = () => {
  todoContainer.innerHTML = ''
  if (todo) {
    const div = createTodo(todo)
    todoContainer.appendChild(div)
  }
}

// completedTodosを元に完了したtodoをレンダリングする
const renderCompletedTodos = () => {
  completedTodoList.innerHTML = ''
  completedTodos.forEach(todo => {
    const completeTodo = createCompletedTodo(todo)
    completedTodoList.appendChild(completeTodo)
  })
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

// 削除ボタンをクリックしたとき
deleteTodoButton.addEventListener('click', () => {
  deleteTodo()
  renderTodo()
})

// 全て削除ボタンをクリックしたとき
deleteAllButton.addEventListener('click', () => {
  deleteAllTodo()
  renderCompletedTodos()
})