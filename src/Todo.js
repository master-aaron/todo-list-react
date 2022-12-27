import React from 'react'
import Form from 'react-bootstrap/Form'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <Form.Check
      type='checkbox'
      id={todo.id}
      label={todo.name}
      checked={todo.complete}
      onChange={handleTodoClick}
      className="fs-5 text-light"
    />
  )
}
