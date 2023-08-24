import { firestore } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ListedTodo() {


    const [ListedTodo, setListedTodo] = useState([])
    const param = useParams()



    const showUserdata = async () => {
        const querySnapshot = await getDocs(collection(firestore, "todos"));

        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
        });
        setListedTodo(docArray)
    }
    useEffect(() => {
        showUserdata();
    }, [])

    const filterTodo = ListedTodo.filter((todo) => todo.list === param.list)

    console.log('param', param)
    console.log('filterTodo', filterTodo)



    return (
        <div className="container vh-100">
            <h1>
                {param.list}
            </h1>
            <div className="row">
                {
                    filterTodo.map((todo) => {
                        return (
                            <>
                                {/* <div className="row"><h1>{ todo.list }</h1></div> */}
                                <div className="col col-md-4 " style={{ height: "40vh" }}>
                                    <div className="row">
                                        <div className="col m-2 rounded-4 overflow-scroll abc" style={{ background: todo.color, height: "38vh" }}>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <h4> {todo.title} </h4>
                                                </div>
                                                <div className="col text-end">
                                                    <div class="dropdown">
                                                        <button class="btn dropdown-toggle btn-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {/* <BsThreeDotsVertical /> */}
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-menu-light ps-2 border-light">
                                                            <li>Update</li>
                                                            <li>Delelte</li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                            <p className='mt-2' style={{ textAlign: 'justify' }}>
                                                {todo.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
