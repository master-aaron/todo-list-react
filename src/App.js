import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function App() {
	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();

	useEffect(() => {
		axios
			.get('http://localhost:4000/api/todos')
			.then((res) => {
				setTodos(res.data);
			})
			.catch((err) => {
				console.log('error');
			});
	});

	function toggleTodo(id) {
		const todoToToggle = todos.find((todo) => todo._id === id);
		todoToToggle.completed = !todoToToggle.completed;

		axios
			.put('http://localhost:4000/api/todos/' + id, todoToToggle)
			.then()
			.catch((err) => {
				console.log(err);
			});
	}

	function handleAddTodo(e) {
		const name = todoNameRef.current.value;
		if (String(name).trim() === '') return;

		const newTodo = { name: name, completed: false };

		axios
			.post('http://localhost:4000/api/todos', newTodo)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		todoNameRef.current.value = null;
	}

	function handleClearTodos() {
		const completedTodos = todos.filter((todo) => todo.completed);

		for (const todoToDelete of completedTodos) {
			axios
				.delete('http://localhost:4000/api/todos/' + todoToDelete._id)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	function handleClearAll() {
		axios
			.delete('http://localhost:4000/api/todos')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Container className="d-flex justify-content-center flex-column mt-5">
			<div className="text-center fw-bold text-light fs-1 mb-3">Todo List</div>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<InputGroup className="mb-3">
				<Form.Control placeholder="Todo Item" ref={todoNameRef} />
				<Button variant="primary" onClick={handleAddTodo}>
					Add Todo
				</Button>
			</InputGroup>

			<div className="d-flex justify-content-center mb-2">
				<Button className="me-1" variant="primary" onClick={handleClearTodos}>
					Clear Completed
				</Button>
				<Button variant="secondary" onClick={handleClearAll}>
					Clear All
				</Button>
			</div>

			<div className="text-center text-light">
				{todos.filter((todo) => !todo.completed).length} left to do
			</div>
		</Container>
	);
}

export default App;
