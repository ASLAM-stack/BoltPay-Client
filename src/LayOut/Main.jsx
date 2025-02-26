import React from 'react';
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='md:w-[640px] w-full min-h-[800px] border-4 px-5 pt-5 rounded-2xl'>
                <Outlet/>
            </div>
        </div>
    );
};

export default Main;