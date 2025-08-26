import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


export const TodoItem = ({ todo, setTodos, handleClickItemTodo }) => {

    const toggleCompleted = async (id, currentValue) => {
        try {
            const todoRef = doc(db, "Todos", id);
            await updateDoc(todoRef, {
                completed: !currentValue,
            });
            // Không cần setTodos ở đây nữa
        } catch (e) {
            console.error("Error updating completed: ", e);
        }
    };

    return (
        <div
            key={todo.id}
            className={`flex  relative items-center  min-h-10 w-[90%] mx-auto   cursor-pointer hover:bg-sideBar hover:text-textPrimary ${todo.completed ? 'line-through text-textSecondary ' : 'text-textPrimary'}`}                        >
            <input className='ml-5' type="checkbox"
                onChange={(e) => {
                    e.stopPropagation();
                    console.log("Before toggle:", todo.id, todo.completed);
                    toggleCompleted(todo.id, todo.completed)
                }} checked={todo.completed} name="completed" id="" />
            <h2 className='ml-3 w-full h-full' onClick={() => handleClickItemTodo(todo)}
            >{todo.title}</h2>
            <FaAngleRight className='ml-auto' />
        </div>
    )
}
