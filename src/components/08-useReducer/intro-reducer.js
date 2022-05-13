
const initialState = [{
	id: 1,
	todo: "comprar pan",
	done: false
}];

const newTodo = {
	id : 2,
	todo: "comprar leche",
	done: false
}
const agregarTodo = {
	type: 'add',
	payload : newTodo
}

const todoReducer = (state = initialState, action) => {
	if (action?.type === 'add'){
		return [...initialState, action.payload]
	}
	return state;
}

let todos = todoReducer();

todos = todoReducer(todos, agregarTodo)
console.log(todos)