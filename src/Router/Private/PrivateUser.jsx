import React from 'react';
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import { Navigate } from 'react-router';


const PrivateUser = ({children}) => {
    const {user,loading} = useAuth()
    const [isAdmin] = useAdmin()
    if (loading || !isAdmin) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user && isAdmin.accountType === 'user') {
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default PrivateUser;