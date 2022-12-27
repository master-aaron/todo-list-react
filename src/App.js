import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuid from 'react-uuid';

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form"

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem((LOCAL_STORAGE_KEY)) || [])
  })
  const todoNameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === ' ') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
   
  function handleClearAll() {
    const newTodos = []
    setTodos(newTodos)
  }

  return (
    <Container className="d-flex justify-content-center flex-column mt-5">
      <div className="text-center fw-bold text-light fs-1 mb-3">Todo List</div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Todo Item"
          ref={todoNameRef}
        />
        <Button variant='primary' onClick={handleAddTodo}>Add Todo</Button>
      </InputGroup>
      
      <div className="d-flex justify-content-center mb-2">
        <Button className='me-1' variant='primary' onClick={handleClearTodos}>Clear Complete</Button>
        <Button variant='secondary' onClick={handleClearAll}>Clear All</Button>
      </div>

      <div className="text-center text-light">{todos.filter(todo => !todo.complete).length} left to do</div>
    </Container>
  ) 
}

export default App;
