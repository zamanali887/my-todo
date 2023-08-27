import { firestore } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'

const FetchDeletedTodo = createContext();

export default function FetchDeletedTodoProvider({ children }) {

    const [deletedTodos, setDeleltedTodos] = useState([]);

    const showTodo = async () => {


        const q = query(collection(firestore, "todos"), where("status", "==", 'inActive'));

        const docArray = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
            setDeleltedTodos(docArray)
        });
    }
    useEffect(() => {
        showTodo();
    }, []);
    console.log('deletedTodos', deletedTodos)
    return (
        <FetchDeletedTodo.Provider value={{ deletedTodos,setDeleltedTodos }}>
            {children}
        </FetchDeletedTodo.Provider>
    )
}

export const useFetchDeletedTodo = () => useContext(FetchDeletedTodo)