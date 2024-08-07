import React, { useEffect, useReducer, useRef, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import "./Todos.css";

const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const DELETE_ALL = "DELETE_ALL";
const DELETE_DONE = "DELETE_DONE";
const COMPLETE = "COMPLETE";
const FILTER = "FILTER";

const initialTodos = [];

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [action.todo, ...state];

    case UPDATE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.newTitle } : todo
      );

    case DELETE:
      return state.filter((s) => s.id !== action.id);

    case DELETE_ALL:
      return [];

    case DELETE_DONE:
      return state.filter((todo) => !todo.complete);

    case COMPLETE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );

    default:
      return state;
  }
};

export const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const titleInputRef = useRef();
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("ALL");

  const handleAdd = (event) => {
    event.preventDefault();
    if (titleInputRef.current.value) {
      const todo = {
        id: todos.length + 1,
        title: titleInputRef.current.value,
        complete: false,
      };
      dispatch({ type: ADD, todo });
      titleInputRef.current.value = "";
    } else {
      alert("To add todo item, please enter todo title first!");
    }
  };

  const handleUpdate = (id) => {
    if (newTitle.trim()) {
      dispatch({ type: UPDATE, id, newTitle });
      setEditing(null);
      setNewTitle("");
    } else {
      alert("Please enter a new title!");
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: DELETE, id });
  };

  const handleDeleteAll = () => {
    const isAllowDelete = window.confirm(
      "Are you sure? You want to delete all todos? This action can't be undone!"
    );
    if (isAllowDelete) {
      dispatch({ type: DELETE_ALL });
    }
  };

  const handleDeleteDone = () => {
    dispatch({ type: DELETE_DONE });
  };

  const handleComplete = (id) => {
    dispatch({ type: COMPLETE, id });
  };

  const handleEdit = (todo) => {
    setEditing(todo.id);
    setNewTitle(todo.title);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleUpdate(id);
    }
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "DONE") return todo.complete;
    if (filter === "UNDONE") return !todo.complete;
    return true; // for "ALL"
  });

  return (
    <>
      <h1 className="todoinput">TodoInput</h1>
      <form onSubmit={handleAdd}>
        <div className="container">
          <div className="container1">
            <label htmlFor="title" className="book">
              <FaBook />
            </label>
            <input
              className="newtodo"
              type="text"
              id="title"
              ref={titleInputRef}
              placeholder="New Todo"
            />
          </div>
          <button className="addnewtask">Add new task</button>
        </div>
      </form>

      <h1 className="todoinput">TodoList</h1>

      <section className="buttons">
        <div className="childbuttons">
          <button className="all" onClick={() => handleFilter("ALL")}>
            All
          </button>
          <button className="done" onClick={() => handleFilter("DONE")}>
            Done
          </button>
          <button className="undone" onClick={() => handleFilter("UNDONE")}>
            Undone
          </button>
        </div>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="todo-item"
            >
              {editing === todo.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo.id)}
                />
              ) : (
                <label style={{ ...(todo.complete && { textDecoration: "line-through", color: "red" }) }}>
                  {todo.title}
                </label>
              )}
              <div>
                <input
                  style={{ accentColor: "yellowgreen" }}
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo.id)}
                />
                {editing === todo.id ? (
                  <button onClick={() => handleUpdate(todo.id)}>Save</button>
                ) : (
                  <BiEditAlt
                    color="orange"
                    size={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(todo)}
                  />
                )}
                <BiSolidTrashAlt
                  color="red"
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <h1>No todos added yet, please add some using the form above!</h1>
        )}
      </section>
    </>
  );
};
