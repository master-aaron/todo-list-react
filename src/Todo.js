import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Todo({ todo, toggleTodo }) {
	function handleTodoClick() {
		toggleTodo(todo._id);
	}

	return (
		<Form.Check
			type="checkbox"
			id={todo._id}
			label={todo.name}
			checked={todo.completed}
			onChange={handleTodoClick}
			className="fs-5 text-light"
		/>
	);
}
