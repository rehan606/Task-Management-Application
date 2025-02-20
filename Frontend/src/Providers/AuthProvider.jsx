/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { app } from '../Firebase/firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    // Create user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // SignOut User 
    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }

    

    // Observer 

    useEffect (()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    },[])

    // Update User profile 
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser , updatedData)
    }


    const authInfo = {
        user,
        loading,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        updateUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;