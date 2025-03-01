import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from '../LayOut/Main';
import LogIn from '../Pages/Login/LogIn';
import Register from '../Pages/Register/Register';
import DashBoard from '../LayOut/DashBoard'
import User from '../Pages/DashBoard/User/User';
import PrivateUser from './Private/PrivateUser';

const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}>
                   <Route index element={<LogIn/>}/>
                   <Route path='/register' element={<Register/>}/>
                   <Route path='/dashboard' element={<DashBoard/>}>
                    <Route path='usedashboard' element={
                        <PrivateUser>
                            <User/>
                        </PrivateUser>
                        }/>
                   </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;