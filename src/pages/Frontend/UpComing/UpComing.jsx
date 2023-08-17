import React, { useEffect, useState } from 'react'
import { firestore } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore'


// import { AiOutlinePlus } from "react-icons/ai"



export default function UpComing() {

    const [getTodo, setGetTodo] = useState([]);
    const [selectedDate, setSelectedDate] = useState("")


    const showTodo = async () => {
        const querySnapshot = await getDocs(collection(firestore, "todos"));

        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
        });
        setGetTodo(docArray)
    }
    useEffect(() => {
        showTodo();
    }, []);


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        setSelectedDate(formattedDate);
    }, []);

    const upComingTodos = getTodo.filter((todo) => todo.date > selectedDate);



    return (
        <>
            <div className="container vh-100">
                <div className="row px-0">
                    <div className="col px-0">
                        <h1>Up Coming</h1>
                    </div>
                </div>
                <div className="row mt-4 px-0">
                    {
                        upComingTodos.map((todo) => {
                            return (
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
                            )
                        })

                    }

                    {/* <div className='col col-md-4 px-0 mt-2 bg-light d-flex justify-content-center align-items-center rounded-4' style={{ height: "40vh" }}>
                        <button className='btn w-100 h-100 btn-outline-light' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal"> <span className='text-dark'> <AiOutlinePlus size={40} /></span> </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}
