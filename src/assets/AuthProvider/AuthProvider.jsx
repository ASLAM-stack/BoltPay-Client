import React, {createContext, useEffect, useState } from 'react';
import auth from '../../FireBase/FireBase.confique';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            console.log('current user',currentUser);
            if (currentUser) {
                const userInfo = {email : currentUser.email}
                //get and store token
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                     
                    if (res.data.token) {
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                //reomve token
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        });
        return () => {
            return unsubcribe();
        }  
    },[axiosPublic])
    const signIN = (email,pin) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,pin)
    }
    const createUser = (email,pin) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,pin)
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const authInfo = {
        user,
        signIN,
        createUser,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;