import React, { useState, useEffect } from "react";

//create your first component
const urlBase = "https://playground.4geeks.com/apis/fake/todos/user/camaron"
const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [task, setTask] = useState({ label: "", done: false });

	const getList = async () => {
		const response = await fetch(urlBase, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		let data = await response.json()
		if (response.ok) {
			setTodoList(data)
		}
		if (response.status == 404) {
			createUser()
		}
	}
	useEffect(() => {
		getList()
	}, [])

	const handleEnter = async (e) => {

		if (e.keyCode === 13) {
			try {
				let response = await fetch(urlBase, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([...todoList, task])
				})
				if (response.ok) {
					getList();
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
	const handleDelete = async (id) => {
		let newTask = todoList.filter((item, index) => id != index)
		try {
			let response = await fetch(urlBase, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTask)
			})
			if (response.ok) {
				getList();
			}
		} catch (error) {
			console.log(error);
		}

	}
	const handleChange = (e) => {
		setTask({
			...task,
			label: e.target.value
		})
	}
	const createUser = async () => {
		let response = await fetch(urlBase, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([])
		})
		if (response.ok) {
			getList
		}
	}
	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					To Do List
				</div>
				<div className="card-body">
					<input
						name="label"
						value={task.label}
						onChange={handleChange}
						type="text"
						onKeyUp={(e) => handleEnter(e)}
						placeholder="What´s needs to be done"
						className="" />
					<ul>{todoList.map((todoItem, index) => <li key={todoItem.id}>{todoItem.label} <button onClick={(e) => handleDelete(index)} id={index}>X</button></li>)}</ul>
				</div>
				<footer className="blockquote-footer"> {todoList.length}</footer>
			</div>
		</div>

	)
};




export default Home;