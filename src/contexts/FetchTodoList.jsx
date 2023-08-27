import { firestore } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'

const FetchTodoList = createContext();

export default function FetchTodoListProvider({children}) {

    const [getList ,setGetList] = useState([]);

    const showTodo = async () => {
        const querySnapshot = await getDocs(collection(firestore, "list"));

        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
            setGetList(docArray)
        });
    }
    useEffect(() => {
        showTodo();
    }, []);

  return (
    <FetchTodoList.Provider value={{getList}}>
        {children}
    </FetchTodoList.Provider>
  )
}

export const useFetchTodoList = () => useContext(FetchTodoList)