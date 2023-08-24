import React, { useState } from 'react'

import { useFetchTodoContext } from 'contexts/FetchTodoContext';




export default function UpComing() {

    const [state, setState] = useState({})
    const { getTodos } = useFetchTodoContext();

    const hanldeChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const randomTodos = getTodos.filter((todo) => todo.date === state.date);


    return (
        <>
            <div className="container vh-100">
                <div className="row px-0">
                    <div className="col px-0">
                        <h1>Calendar</h1>
                    </div>
                </div>
                <div className="row px-0 d-flex justify-content-center">
                    <div className="col-12 col-md-6 px-0">
                        <label className='fw-bold'>Select Todo Date</label>
                        <input type="date" name='date' className='form-control' required onChange={hanldeChange} />
                    </div>
                </div>

                <div className="row mt-4 px-0">
                    {
                        randomTodos.map((todo) => {
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
