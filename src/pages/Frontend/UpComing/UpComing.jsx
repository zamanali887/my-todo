import React, { useEffect, useState } from 'react'
import { useFetchTodoContext } from 'contexts/FetchTodoContext';





export default function UpComing() {

    const [selectedDate, setSelectedDate] = useState("")
    const { getTodos } = useFetchTodoContext();


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        setSelectedDate(formattedDate);
    }, []);

    const upComingTodos = getTodos.filter((todo) => todo.date > selectedDate);



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
                                <div className="col-12 col-md-4 " style={{ height: "40vh" }}>
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
                </div>
            </div>
        </>
    )
}
