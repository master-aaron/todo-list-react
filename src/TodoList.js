import React from 'react'
import Todo from './Todo'

import Form from 'react-bootstrap/Form'

export default function TodoList({ todos, toggleTodo }) {
  return (
    <Form className='mb-5'>
      {todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
      })}
    </Form>
    
  )
}
