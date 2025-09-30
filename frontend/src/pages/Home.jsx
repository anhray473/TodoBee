import React, { useState } from 'react'
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useAddTask, useDeleteTask, useGetTaskByList, useToggleTask, useUpdateTask } from '../components/hooks/taskAPI';
import { toast } from 'react-toastify';

export const Home = ({ currentList, list }) => {
    const { data: task, isLoading, isError } = useGetTaskByList(currentList);
    const updateTask = useUpdateTask();
    const addTask = useAddTask();
    const toggleTask = useToggleTask()
    const deleteTask = useDeleteTask()
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(false)
    const defaultForm = {
        _id: '',
        title: '',
        description: '',
        createAt: Date.now(),
        completed: false,
        listID: currentList,

    }
    const [selectTask, setSelectTask] = useState(defaultForm)
    const [error, setError] = useState({})


    //Click Item 
    const handleClickItem = (item) => {
        setSelectTask(item)
        setEditing(true)
        setShowForm(true);
    }

    //Click Add task
    const handleClickAddItem = () => {
        setError(0)
        setSelectTask(defaultForm);
        setEditing(false)
        setShowForm(true);
    }

    //Onchange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(0);
        setSelectTask({
            ...selectTask,
            [name]: value
        });
    };

    const handleSaveChange = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!selectTask.title?.trim()) {
            newErrors.title = "Title cannot be empty"
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors)
            return
        }
        if (editing) {
            try {
                updateTask.mutate({
                    id: selectTask._id,
                    data: selectTask
                });
                toast.success('Update task success')
                setSelectTask(defaultForm)
                setShowForm(false)
            } catch (error) {
                toast.error('Update task fail')
            }
        }
        else {
            try {
                const { _id, ...newTask } = selectTask;
                addTask.mutate(newTask)
                toast.success("Add task success")
                setSelectTask(defaultForm)
                setShowForm(false)

            } catch (error) {
                toast.error("Add task fail")
            }
        }
    }

    const handleDeleteTask = () => {
        if (editing) {
            try {
                deleteTask.mutate(selectTask._id)
                toast.success('Deleted task success')
                setSelectTask(defaultForm);
                setShowForm(false)

            } catch (error) {
                toast.warning('Can not delete task ')
            }
        }
        else {
            setSelectTask(defaultForm);
            setShowForm(false)
        }
    }

    const handleToggle = (id) => {
        toggleTask.mutate(id)
    }

    return (
        <div className='grid grid-cols-[60%,40%] '>
            <div className='space-y-4'>
                <h1>List: {currentList}</h1>
                <button onClick={handleClickAddItem} className='flex rounded-lg p-1 border-2 items-center hover:bg-yellow-300'><Plus size={18} />Add new task</button>
                {task && task.length > 0 ? (task?.map(item => (
                    <div key={item._id} className={`flex justify-between border p-2 rounded-lg items-center w-[95%] cursor-pointer ${item.completed ?'line-through':''} ${item._id === selectTask._id ? 'bg-hover' : ''} hover:bg-hover`}
                        onClick={() => handleClickItem(item)}>
                        <div >
                            <input className='mr-2' type="checkbox" checked={item.completed} onChange={() => handleToggle(item._id)} />
                            {item.title}
                        </div>
                        {
                            item._id === selectTask._id ? <ChevronLeft size={18} ></ChevronLeft> : <ChevronRight size={18} ></ChevronRight>
                        }
                    </div>
                ))) : (<p>Danh sách rỗng</p>)}

            </div>
            {showForm ? (
                <div className='flex justify-center items-center '>
                    <div className=' w-[90%] h-[90%] flex flex-col justify-between bg-hover p-8 rounded-lg '>
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold text-textPrimary mb-10'>{editing ? 'Task Infomation' : 'Add New Task'}</h1>
                            <p className={`font-semibold ${error.title && 'text-red-500'} `}>Title:</p>
                            <input type="text" name="title" value={selectTask.title} onChange={handleChange} className={`w-full rounded-lg p-1 ${error.title && 'border-2 border-red-500'}`} />
                            {error.title && <p className='text-red-500'>{error.title}</p>}
                            <p className='font-semibold'>Descripton:</p>
                            <textarea className='w-full rounded-lg p-2' rows={4} name="description" onChange={handleChange} value={selectTask.description} />
                            <div className='flex space-x-2 items-center'>
                                <p className='font-semibold'>List: </p>
                                <select value={selectTask.listID} name="listID" onChange={handleChange}
                                    className='rounded-lg p-1'>
                                    {list.map(item => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className='flex justify-around gap-5'>
                            <button type="button" onClick={handleDeleteTask} className='flex-1 border-2 px-10 py-2 font-bold rounded-lg text-textPrimary bg-gray-300 '>{editing ? 'Delete Task' : 'Cancel'}</button>
                            <button type="button" onClick={handleSaveChange} className='flex-1 border-2 px-10 py-2 font-bold rounded-lg text-textPrimary bg-yellow-300 '>{editing ? 'Save Change' : 'Add task'}</button>
                        </div>
                    </div >
                </div >
            ) : (
                <div className='flex justify-center items-center bg-slate-500'>
                    <div className='bg-blue-200 w-[80%] h-[90%]'>
                        <h1>Total task : {task?.length || 0}</h1>
                    </div >
                </div >
            )}
        </div >
    )
}
