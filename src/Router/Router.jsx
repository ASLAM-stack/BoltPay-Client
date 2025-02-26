import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from '../LayOut/Main';
import LogIn from '../Pages/Login/LogIn';
import Register from '../Pages/Register/Register';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}>
                   <Route index element={<LogIn/>}/>
                   <Route path='/register' element={<Register/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;