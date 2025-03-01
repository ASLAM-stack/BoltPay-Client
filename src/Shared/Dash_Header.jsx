import React, { useState } from 'react';
import useAdmin from '../Hooks/useAdmin';
import { FaCheckCircle } from "react-icons/fa";
 

const Dash_Header = () => {
    const [isAdmin,refetch] = useAdmin()
    const {name,amount,verification} = isAdmin;
    const [count,setCount] = useState(0)
    return (
        <div className='bg-[#3fe8ee]'>
            <div>
                <div className='flex items-center gap-1.5'>
                <h1 className='text-2xl font-bold robo '>{name}</h1>
                <FaCheckCircle className={`${verification ? 'text-[#00BCD4]':'text-[#5f5050]'} mt-2`}/>
                </div>
                <div>
                
         
                </div>
            </div>
        </div>
    );
};

export default Dash_Header;