import React from 'react';

const PrivateAdmin = ({children}) => {
    const {user,loading} = useAuth() 
    const [isAdmin] = useAdmin()
    if (loading || !isAdmin) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user && isAdmin === 'admin') {
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default PrivateAdmin;