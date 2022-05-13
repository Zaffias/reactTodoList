import React, {useEffect, useReducer, useState} from 'react'
import "./index.css"
import { todoReducer } from './todoReducer'

const init = () => {

	return JSON.parse(localStorage.getItem('todos')) || [];
	// return [{
	// 	id: new Date().getTime(),
	// 	description: 'Aprender React',
	// 	done: false
	// }]
}
export const TodoApp = () => {
	const [todos, dispatch] = useReducer(todoReducer, [], init)

	const [state, setState] = useState('')

	useEffect(()=>{
		localStorage.setItem('todos', JSON.stringify( todos ))
	},[todos])

	const handleDelete = ( todoId ) => {
		console.log(todoId)
		
		const action = {
			type: 'delete',
			payload: todoId
		}
		dispatch(action);
	}
	
	const handleSubmit = (e) =>{
		e.preventDefault()
		const hora = new Date()
		const newTodo = {
			id: hora.getTime(),
			description: state,
			done: false,
			date: `${hora.getHours()}:${hora.getMinutes() < 10 ? '0' + hora.getMinutes() : hora.getMinutes}:${hora.getSeconds() < 10 ? '0' + hora.getSeconds() : hora.getSeconds()}`
		};

		const action = {
			type: 'add',
			payload: newTodo
		};
	
		state.trim() && dispatch( action );
		setState('');
	}
	const handleChange = ({target}) =>{
		setState(target.value)
	}

	const handleDone = (todoId) => {
		const action = {
			type: 'polla',
			payload: todoId
		}
		dispatch(action);
	}
  	return (
		<div>
			<h1>Todo App : ( {todos.length} )</h1>
			<hr/>
			<div className='row'>
				<div className='col-7'> 
					<ul className='list-group list-group-flush'>
					{
						todos.map((todo, i) => {
							return (<li 
								key={todo.id} 
								className='list-group-item'>
								<p className={`text-align ${todo.done && 'complete'}`} onClick={ () => handleDone(todo.id) }>{i + 1}. {todo.description}</p>
								<p><small>{todo.date}</small></p>
								<button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>
									Borrar
								</button>
							</li>)
						})
					}
					</ul>
				 </div>
				<div className='col'>
					<h4>Agregar Todo</h4>
					<hr/>
					<form onSubmit={ handleSubmit }>
						<input
							type='text'
							name='description'
							placeholder='Pinga'
							autoComplete='off'
							className='form-control'
							value={state}
							onChange= {handleChange}
						/>
						<button 
						className='btn btn-outline-primary mt-1 btn-block'
						type='submit'
						>Agregar</button>
					</form>
				</div>
			</div>
		</div>
  )
}
