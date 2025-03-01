import React from 'react';
import { Outlet } from 'react-router';

const DashBoard = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default DashBoard;