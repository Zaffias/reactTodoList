export const todoReducer = (state = [], action) =>{
	
	switch( action.type ){
		case 'add':
			return [ ...state, action.payload ];
		case 'delete':
			return state.filter(todo => todo.id !== action.payload)
		case 'polla': 
			return state.map(todo => {
				if( todo.id === action.payload){
					todo.done = !todo.done
				}
				return todo
			})
		default:
			return state
	}
}