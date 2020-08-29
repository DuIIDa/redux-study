import {INCREMENT, DECREMENT, CHANGE_THEME, 
    DISABLE_BUTTONS, ENABLE_BUTTONS} from './types'
    
export function increment() { // Тип дейвсия
    return {
        type: INCREMENT
    }
}
export function decrement() { // Тип дейвсия
    return {
        type: DECREMENT
    }
}

// При async с ипользование thunk мы возвращаем функция внутри которой можно делать
// все что нужно ( запрос)
export function asyncIncrement() { 
    return function(dispatch){ 
        dispatch(disableButtons())
        setTimeout(() => {
            dispatch(increment())
            dispatch(enableButtons())
        }, 2000);
    }
}
export function disableButtons() { // Тип дейвсия
    return {
        type: DISABLE_BUTTONS
    }
}
export function enableButtons() { // Тип дейвсия
    return {
        type: ENABLE_BUTTONS
    }
}


export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}