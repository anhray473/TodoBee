import React, { useEffect, useState } from 'react'
import { FaPlus, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { collection, addDoc, updateDoc, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { TodoItem } from './TodoItem';

export const ListToday = ({ list }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "Todos")); // có thể where("listID", "==", list.id) nếu muốn lọc

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const todosData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(todosData);
        });

        return () => unsubscribe(); // cleanup listener
    }, [list]);

    const [showForm, setShowForm] = useState(false)
    const [editting, setEditting] = useState(false)
    const defaultForm = {
        id: '',
        title: '',
        description: "",
        completed: false,
        dueDate: Date.now(),
        listID: ""
    }
    const [todoSelected, setTodoSelected] = useState(defaultForm)

    //Click button add
    const handleClickAddTodo = () => {
        setTodoSelected(defaultForm)
        setShowForm(true)
    }

    //Click item todo
    const handleClickItemTodo = (todo) => {
        setTodoSelected(todo);
        setShowForm(true)
    }

    //Close Form
    const handleClickCloseForm = () => {
        setTodoSelected(defaultForm)
        setShowForm(false)
    }

    //
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setTodoSelected(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    //Add new task
    const addNewTask = async () => {
        if (todoSelected.title.trim() == "") {
            alert("Title không được để trống");
            return;
        }
        // if (todoSelected.)
        try {
            const newTask = {
                title: todoSelected.title,
                description: todoSelected.description,
                listID: todoSelected.listID,
                dueDate: todoSelected.dueDate,
                completed: todoSelected.completed
            }
            const docRef = await addDoc(collection(db, "Todos"), newTask);
            console.log("Document written with ID: ", docRef.id);

            // Reset form
            setTodoSelected(defaultForm);
            setShowForm(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewTask();
    }


    return (
        <div className={` grid ${showForm ? 'grid-cols-[1fr,500px]' : ''}`}>
            <div>
                <h1 className=' font-bold text-black text-5xl mt-5'>Today</h1>
                <button onClick={handleClickAddTodo} className='flex border-y  min-h-10 w-[90%] mt-10 mb-5 items-center pl-5 mx-auto text-textPrimary hover:bg-hover'> <FaPlus className='mr-3' />Add New Task</button>
                {/* <button  className='flex rounded-lg  min-h-9 min-w-40 mt-10 mb-5 items-center pl-3 ml-auto text-textPrimary bg-button mr-[5%]'> <FaPlus className='mr-3' />Add New Task</button> */}

                <div className='divide-y divide-gray-300'>
                    {
                        todos.map(todo => (
                            <TodoItem
                                todo={todo}
                                handleClickItemTodo={handleClickItemTodo}
                                setTodos={setTodos}
                            />
                        ))
                    }
                </div>

            </div>
            {showForm &&
                <div className='relative flex h-[95%] bg-sideBar my-auto mr-3 rounded-lg'>
                    <div className='flex flex-col    h-[90%] w-[90%] m-auto text-textPrimary relative'>
                        <IoClose onClick={handleClickCloseForm} className="absolute right-3 top-3 cursor-pointer text-xl text-textSecondary hover:text-textPrimary" />
                        <form action="submit" onSubmit={handleSubmit} className='flex flex-col gap-y-5 flex-1'>
                            <h1 className='font-bold text-xl '>Task:</h1>
                            <input placeholder='Title' className='p-2 rounded-md bg-sideBar border' value={todoSelected.title} type="text" onChange={handleChange} name="title" id="" />
                            {/* <label className='font-medium' htmlFor="description">Descritption:</label> */}
                            <textarea placeholder='Description' className='p-2 py-2 min-h-32 bg-sideBar border rounded-md' value={todoSelected.description} row='' onChange={handleChange} name="description" id=""></textarea>
                            <div className='grid grid-cols-[100px,1fr]'>
                                <label htmlFor="">List</label>
                                <select className='w-fit rounded-md bg-sideBar border p-1' value={todoSelected.listID} name="listID" id="" onChange={handleChange}>
                                    <option value="">Select list</option>
                                    {list.map(item => (<option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='grid grid-cols-[100px,1fr]'>
                                <label htmlFor="">Due date</label>

                            </div>
                            <h1 className='font-bold text-xl '>Subtasks:</h1>
                            <button onClick={handleClickAddTodo} className='flex border-y  min-h-18 w-[90%] mb-5 items-center pl-5 mx-auto text-textPrimary hover:bg-hover'> <FaPlus className='mr-3' />Add New Subtask</button>
                            <p>{todoSelected.description}</p>
                            <div className="flex space-x-4 w-full mt-auto">
                                <button className="flex-1 px-4 font-medium py-2 bg- border-2 rounded">Delete Task</button>
                                <button type='submit' className=" flex-1 px-4 font-medium py-2 bg-yellow-400 text-black rounded">Save changes</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

        </div>
    )
}
