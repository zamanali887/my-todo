import { firestore } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'

const FetchTodoContext = createContext();

export default function FetchTodoContextProvider({children}) {

    const [getTodos ,setGetTodos] = useState([]);

    const showTodo = async () => {
        const querySnapshot = await getDocs(collection(firestore, "todos"));

        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
            console.log('data', data)
            setGetTodos(docArray)
        });
    }
    useEffect(() => {
        showTodo();
    }, []);

  return (
    <FetchTodoContext.Provider value={{getTodos}}>
        {children}
    </FetchTodoContext.Provider>
  )
}

export const useFetchTodoContext = () => useContext(FetchTodoContext)