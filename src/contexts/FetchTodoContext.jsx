import { firestore } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'

const FetchTodoContext = createContext();

export default function FetchTodoContextProvider({ children }) {

    const [getTodos, setGetTodos] = useState([]);

    const showTodo = async () => {


        const q = query(collection(firestore, "todos"), where("status", "==", 'active'));

        const docArray = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
            setGetTodos(docArray)
        });
    }
    useEffect(() => {
        showTodo();
    }, []);

    return (
        <FetchTodoContext.Provider value={{ getTodos,setGetTodos }}>
            {children}
        </FetchTodoContext.Provider>
    )
}

export const useFetchTodoContext = () => useContext(FetchTodoContext)