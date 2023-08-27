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
                                <div className="col-12 col-md-6 col-lg-4" style={{ height: "40vh" }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-between flex-column m-2 rounded-4 overflow-scroll abc" style={{ background: todo.color, height: "38vh" }}>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <h4> {todo.title} </h4>
                                                </div>
                                                <div className="row">
                                                    <p className='mt-2' style={{ textAlign: 'justify' }}>
                                                        {todo.description}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col mb-1 text-center fw-bold">
                                                    {todo.date}
                                                </div>
                                            </div>
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
