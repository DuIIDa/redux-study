import {createStore, applyMiddleware, compose} from 'redux' // Подключаем Redux
import ReduxThunk from 'redux-thunk' // Позволяет добавлять асинхронные действия(actions)
import logger from 'redux-logger' // Для создания логгера() Позволяет следить за состояние(Текущее, прошлое состояние и тд)
import {increment, decrement, asyncIncrement, changeTheme} from './Redux/actions' // Подключаем функция возвращающаие дейтвие и type
import {rootReducer} from './Redux/rootReducer'
import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) { // СОЗДАНИЕ собственного Middleware, для доп функционала
//     return function(next) {
//         return function(action) {
//             console.log("STETE", state)
//             console.log("action", action)
//             return next(action)
//         }
//     }
// }

// При thunk добалятся 3 параметр функция applyMiddleware(ReduxThunk)
//const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger))  без DevTools

const store = createStore(
    rootReducer, 
    compose(
        applyMiddleware(ReduxThunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //Связыавет с DevTools
    )
)



addBtn.addEventListener('click', () => {
   store.dispatch(increment()) //Вызываем dispatch с действие которое должно произойти в объекте type
})
subBtn.addEventListener('click', () => {
    store.dispatch(decrement()) //Вызываем dispatch с действие которое должно произойти в объекте type
})
asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})





themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? 'dark' : 'light'
    store.dispatch(changeTheme(newTheme))
    //document.body.classList.toggle('dark')
})






store.subscribe(() => { //Вызывается всегда, после dispatch
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})
store.dispatch({type: 'INIT_APPLICATION'})