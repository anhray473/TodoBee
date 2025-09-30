import React, { useState } from 'react'
import logo from "../../asset/img/logo.svg"
import { Link } from 'react-router-dom';
import { useAddList } from '../hooks/listAPI';
import { ChevronsRight, Edit, Plus, Trash, X } from 'lucide-react';
import { toast } from 'react-toastify';

export const Sidebar = ({ list, deleteList, currentList, setCurrentList }) => {

    const [listAdd, setListAdd] = useState(false)
    const [listEdit, setListEdit] = useState(false)
    const [nameList, setNameList] = useState('')

    const addList = useAddList();

    const handleAddList = async () => {
        try {
            const data = await addList.mutateAsync({ name: nameList });
            setListAdd(false)
            setNameList('')
            setCurrentList(data.data._id);
            toast.success('Create list success')
        } catch (error) {
            toast.success('Create list fail')
        }
    }

    const handleDeleteList = (id) => {
        try {
            deleteList.mutate(id)
            if (id === currentList) {
                if (list.length > 0) {
                    setCurrentList(list[0]._id)
                } else {
                    setCurrentList('')
                }
            }
            toast.success('Delete list success')

        } catch (error) {
            toast.success('Delete list fail')

        }
    }
    return (
        <div className='bg-sideBar flex flex-col space-y-3'>
            <img src={logo} className='w-40 mx-auto'></img>
            <input type='search' placeholder='Search' className='rounded-lg min-h-8 w-[90%] mx-auto placeholder:pl-3 bg-none border-2 '></input>
            <div className='flex items-center justify-between '>
                <span className=' mx-4 text-textPrimary font-semibold'>List</span>
                {listEdit ?
                    <X onClick={() => setListEdit(false)} className='mr-4 cursor-pointer' size={16}></X>
                    :
                    <Edit onClick={() => setListEdit(true)} className='mr-4 cursor-pointer' size={16}></Edit>
                }
            </div>
            <ul className=' w-[90%] mx-auto'>
                {list && list?.length > 0 ? (

                    list.map(item => (
                        <div key={item._id} onClick={() => setCurrentList(item._id)} className={`cursor-pointer flex px-3 items-center justify-between rounded-lg min-h-9 ${item._id === currentList ? "bg-hover text-textPrimary" : "text-textSecondary "} font-semibold hover:bg-hover hover:text-textPrimary `}>
                            <li className='flex  items-center ' to="/todos"><ChevronsRight className='mr-3' />{item.name}</li>
                            {listEdit && <Trash size={16} className='cursor-pointer' onClick={() => handleDeleteList(item._id)} />}
                        </div>
                    ))
                ) : <p>No list available</p>}
                {listAdd ? (
                    <div className='flex gap-2'>
                        <input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddList();
                            }
                        }} type="text" value={nameList} placeholder='fill list name' onChange={(e) => setNameList(e.target.value)} className='rounded-lg min-h-8 w-[90%] mx-auto placeholder:pl-3 bg-none border-2 '></input>
                        <button onClick={handleAddList} className='bg-slate-400 rounded px-2' >Add</button>
                    </div>
                ) : (
                    <li onClick={() => setListAdd(true)} className='flex cursor-pointer rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/todos"><Plus className='mx-3' />Add New List</li>
                )}
            </ul>


        </div>
    )
}
