import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";


const url = "https://6565ad4beb8bb4b70ef21a42.mockapi.io/todo"

const App = () => {
    const [todos, setTodos] = useState([])
    const [todoAdd, setTodoAdd] = useState('')
    const [editTodo, setEditTodo] = useState(null)
    const [editTodoTitle, setEditTodoTitle] = useState('')

    useEffect(() => {
        axios('https://6565ad4beb8bb4b70ef21a42.mockapi.io/todo')
            .then(({data}) => setTodos(data))
    }, []);
    console.log(todos)


    const handleAddTodo = () => {
        const newTodo = {
            title: todoAdd,
            completed: false,
            createdit: null,
            completedAt: +new Date()

        }
        setTodoAdd('')
        axios.post(url, newTodo)
            .then(({data}) => setTodos([...todos, data]))
    }

    const handleDeleteTodo = (todo) => {

        axios.delete(`${url}/${todo.id}`, todo)
            .then(({data}) => setTodos(todos.filter((todo) => todo.id !== data.id)))
    }

    const handleEdit = (todo) => {
        setEditTodo(todo.id)
        setEditTodoTitle(todo.title)
    }

    const handleSave=()=>{
        axios.put(`${url}/${editTodo}`, {title: editTodoTitle})
            .then(({data})=>
            {
                const saveTodos = todos.map((todo)=>todo.id===data.id?data:todo)
                setTodos(saveTodos)
                setEditTodo(null)
            })
    }

    return (
        <div className={'container'}>
            <div className="todo-container">
                <h1>Todo List</h1>
                <div className="input-container">
                    <input type="text" onChange={(e) => setTodoAdd(e.target.value)} placeholder={'Add new ToDo'}/>
                    <button className={'addBtn'} onClick={handleAddTodo}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></button>
                </div>
                <div>
                    {
                        todos.map(todo =>
                            <div className={'todo-wrapper'} key={todo.id}>
                                {editTodo===todo.id?(

                                    <>
                                        <input className={'editInput'} placeholder={"Edit Todo"} type="text" value={editTodoTitle} onChange={(e)=>setEditTodoTitle(e.target.value)}/>
                                        <button className={'saveBtn'} onClick={handleSave}>Save</button>
                                    </>
                                ):(
                                    <>
                                        <p>{todo.title}</p>
                                        <input type="checkbox" checked={todo.completed}/>
                                        <span>{dayjs(todo.completedAt).format('HH:mm MM/DD/YYYY')}</span>
                                        <div className="btn-container">
                                            <button className={'editBtn'} onClick={()=>handleEdit(todo)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg></button>
                                            <button className={'deleteBtn'} onClick={() => handleDeleteTodo(todo)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg></button>
                                        </div>
                                    </>
                                )}



                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}
export default App