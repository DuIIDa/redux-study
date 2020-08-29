export function createStore(rootReducer, initialState) { 
    
    let state = rootReducer(initialState, {type: '_INIT_'})
    const subscribers =[]
    
    return {
        // action === {type: 'INCREMENT'}
        dispatch(action) { // Говорит, что что-то произошло и нужно изменить
            state = rootReducer(state, action)
            subscribers.forEach(sub => sub())
        },
        subscribe(callback) { // Все слушатели должно что-то поменять
            subscribers.push(callback)
        },
        getState() {
            return state
        }
    }
}
