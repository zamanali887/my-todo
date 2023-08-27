import React from 'react'

import { useFetchTodoContext } from 'contexts/FetchTodoContext';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

export default function ListedTodo() {


    const { getTodos } = useFetchTodoContext();
    const param = useParams()
    const filterTodo = getTodos.filter((todo) => todo.newlist.id === param.id);
    const findTodo = getTodos.find((todo) => todo.newlist.id === param.id);
    if(!findTodo){
        return message.error("Todos not found on this list item!")
    }

    return (
        <div className="container vh-100">
            <h1 style={{textTransform:"capitalize"}}>
                {findTodo? findTodo.newlist.name : ""}
            </h1>
            <div className="row">
                {
                    filterTodo.map((todo) => {
                        return (
                            <>
                                <div className="col-12 col-md-6 col-lg-4" style={{ height: "40vh" }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-between flex-column m-2 rounded-4 overflow-scroll abc" style={{ background: todo.color, height: "38vh" }}>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <h4> {todo.title} </h4>
                                                </div>
                                                <div className="rpw text-end">

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
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
