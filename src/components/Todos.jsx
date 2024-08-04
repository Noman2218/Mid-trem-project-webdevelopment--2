import React, { useEffect, useReducer, useRef, useState } from 'react';
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import './Todos.css'

const ADD = "ADD";
const UPDATE = "UPDATE";

// const initialTodos = [
//     {
//         id: 1,
//         title: "Todo 1",
//         complete: false,
//     },
//     {
//         id: 2,
//         title: "Todo 2",
//         complete: false,
//     },
// ];
const initialTodos = [];

const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return [action.todo, ...state,]

        case UPDATE:
            console.log("UPDATE");
            return;

        case "DELETE":
            return state.filter(s => s.id !== action.id);

        case "DELETE_ALL":
            return [];

        case "DELETE_DONE":
            console.log("DELETE_DONE");
            return

        case "COMPLETE":
            // console.log("COMPLETE");
            return state.map((todo) => todo.id === action.id ? { ...todo, complete: !todo.complete } : todo);
        // return state.map((todo) => {
        //     if (todo.id === action.id) {
        //         return { ...todo, complete: !todo.complete };
        //     } else {
        //         return todo;
        //     }
        // });
        case "FILTER":
            console.log({ state, action });
            if (action.filter === "ALL") {
                console.log("ALL");
                return action.copiedTodos;
            } else if (action.filter === "DONE") {
                console.log("DONE");
                return action.copiedTodos.filter((todo) => todo.complete)
            } else if (action.filter === "UNDONE") {
                console.log("UNDONE");
                return action.copiedTodos.filter((todo) => !todo.complete)
            }
        // if (action.filter === "ALL") {
        //     console.log("ALL");
        //     return state;
        // } else if (action.filter === "DONE") {
        //     console.log("DONE");
        //     return state.filter((todo) => todo.complete)
        // } else if (action.filter === "UNDONE") {
        //     console.log("UNDONE");
        //     return state.filter((todo) => !todo.complete)
        // }

        default:
            return state;
    }
};
let copiedTodos = [];
export const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialTodos);
    const titleInputRef = useRef();
    const [action, setAction] = useState(0);
    // const copiedTodos = [...todos];

    useEffect(() => {
        console.log({ action, todos });
        copiedTodos = [...todos]
    }, [action]);

    console.log("todos: ", todos, copiedTodos);

    const handleAdd = (event) => {
        event.preventDefault();
        if (titleInputRef.current.value) {
            // setAction(1)
            setAction(Math.random() * 100);
            const todo = {
                id: todos.length + 1,
                title: titleInputRef.current.value,
                complete: false,
            };
            dispatch({ type: ADD, todo });
            titleInputRef.current.value = ""
        } else {
            alert("To add todo item, please enter todo title first!")
        }

    };

    const handleUpdate = (todo) => {
        // setAction(2);
        setAction(Math.random() * 100);
        dispatch({ type: UPDATE, id: todo.id });
    };

    const handleDelete = (id) => {
        // setAction(3);
        setAction(Math.random() * 100);
        console.log("id:", id);
        dispatch({ type: "DELETE", id: id });
    };

    const handleDeleteAll = () => {
        // setAction(4);
        setAction(Math.random() * 100);
        const isAllowDelete = window.confirm("Are you sure? You want to delete all todos? This action can't be undone!")
        console.log("isAllowDelete: ", isAllowDelete);
        if (isAllowDelete) {
            dispatch({ type: "DELETE_ALL" });
        }
    };

    const handleDeleteDone = () => {
        // setAction(5);
        setAction(Math.random() * 100);
        dispatch({ type: "DELETE_DONE" });
    };

    const handleFilter = (selectedFilter) => {
        // setAction(6);
        setAction(Math.random() * 100);
        dispatch({ type: "FILTER", filter: selectedFilter, copiedTodos });
    };

    // const handleComplete = (todo) => {
    //     // console.log(todo, "todo");
    //     dispatch({ type: "COMPLETE", id: todo.id });
    // };

    const handleComplete = (id) => {
        // setAction(7);
        setAction(Math.random() * 100);
        // console.log(todo, "todo");
        dispatch({ type: "COMPLETE", id: id });
    };

    return (
        <>
        <h1 className='todoinput'>TodoInput</h1>
            <form onSubmit={handleAdd} >
                <div className='container'>
                <div className='container1'>
                    <label htmlFor="title" className='book'><FaBook /></label>
                    <input className='newtodo' type="text" id="title" ref={titleInputRef} placeholder='New Todo' />
                </div>
                <button className='addnewtask'>Add new task</button>
                </div>
            </form>


        </>
    );
}