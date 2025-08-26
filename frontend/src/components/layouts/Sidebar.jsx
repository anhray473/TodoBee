import React from 'react'
import { FaAngleDoubleRight, FaCalendar, FaPlus, FaStickyNote } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import logo from "../../asset/img/logo.svg"
import { Link } from 'react-router-dom';

export const Sidebar = ({list}) => {
    
    return (
        <div className='bg-sideBar flex flex-col'>
            <img src={logo} className='w-40 mx-auto'></img>
            <input type='search' placeholder='Search' className='rounded-lg min-h-8 w-[90%] mx-auto placeholder:pl-3 bg-none border-2 '></input>
            <span className='mt-5 ml-4 text-textPrimary font-semibold'>Task</span>
            <ul className=' w-[90%] mx-auto'>
                <li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/todos"><FaAngleDoubleRight className='mx-3' />Upcoming</Link></li>
                <li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/today"><FaListCheck className='mx-3' /> Today</Link></li>
                <li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/settings"><FaCalendar className='mx-3 ' /> Calendar</Link></li>
                <li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/settings"><FaStickyNote className='mx-3' /> Sticky Wall</Link></li>
            </ul>
            <span className='mt-5 ml-4 text-textPrimary font-semibold'>List</span>
            <ul className=' w-[90%] mx-auto'>
                {list.map(item => (<li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/todos"><FaAngleDoubleRight className='mx-3' />{item.name}</Link></li>
                ))}
                <li><Link className='flex rounded-lg min-h-9 items-center text-textSecondary font-semibold hover:bg-hover hover:text-textPrimary focus:bg-hover focus:text-textPrimary' to="/todos"><FaPlus className='mx-3' />Add New List</Link></li>
            </ul>

        </div>
    )
}
