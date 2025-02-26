import React from 'react';

const AuthProvider = () => {
    if (loading || !isAdmin) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;