import React, { useState } from 'react'
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from 'config/firebase';
import { message } from 'antd';

import { useFetchDeletedTodo } from 'contexts/FetchDeletedTodo';
import { useFetchTodoContext } from 'contexts/FetchTodoContext';

import { VscDebugRestart } from 'react-icons/vsc'
import { AiFillDelete } from 'react-icons/ai'
import { GrStatusGood } from 'react-icons/gr'
import { RxCrossCircled } from 'react-icons/rx'

export default function Deleted() {


    const [stateRestore, setStateRestore] = useState({});
    const [stateDelete, setStateDelete] = useState({});
    const { deletedTodos, setDeleltedTodos } = useFetchDeletedTodo();
    const { getTodos } = useFetchTodoContext();

    const handleRestore = async (todo) => {
        setStateRestore(todo)
    }
    const afterRestore = async () => {
        try {
            await setDoc(doc(firestore, "todos", stateRestore.id), { status: "active" }, { merge: true });
            let todosAfterRestore = deletedTodos.filter(doc => doc.id !== stateRestore.id)
            let restoreTodo = deletedTodos.find(doc => doc.id === stateRestore.id)
            message.success("Todo Restore Successfully")
            setDeleltedTodos(todosAfterRestore)
            getTodos.push(restoreTodo)
        } catch (e) {
            message.error("SomeThing went Wrong While Restoring Todo")
        }
    }
    const handleDelete = async (todo) => {
        setStateDelete(todo)

    }
    const afterDelete = async (todo) => {
        try {
            await deleteDoc(doc(firestore, "todos", stateDelete.id));
            let todosAfterRestore = deletedTodos.filter(doc => doc.id !== stateDelete.id)

            message.success("Todo Deleted Permanently")
            setDeleltedTodos(todosAfterRestore)

        } catch (e) {
            message.error("SomeThing went Wrong While Restoring Todo")
        }

    }
    return (
        <>
            <div className="container">
                <div className="row px-0">
                    <div className="col px-1">
                        <h2>Recently Deleted</h2>
                    </div>
                </div>
                <div className="row mt-4 px-0">
                    {
                        deletedTodos.map((todo) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4" style={{ height: "40vh" }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-between flex-column m-2 rounded-4 overflow-scroll abc" style={{ background: todo.color, height: "38vh" }}>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <h4> {todo.title} </h4>
                                                </div>
                                                <div className="col-4 col-md-3 me-1">
                                                    <div className='row text-end'>
                                                        <div className='col px-0'><span className='bg-white text-info rounded px-1 pb-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleRestore(todo)}>  <VscDebugRestart /></span></div>
                                                        <div className='col px-0'><span className='bg-white rounded text-danger px-1 pb-1' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleDelete(todo)}> <AiFillDelete /></span></div>


                                                    </div>

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

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <span className=''><GrStatusGood size={30} /> </span>
                                <h3>Are you Sure</h3>
                                <p>Do you really want to restore this Todo?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal"  onClick={afterRestore}>Restore</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <span className='text-danger'><RxCrossCircled size={36} /> </span>
                                <h3>Are you Sure</h3>
                                <p>Do you really want to delete this Todo? This process Cannot be undone.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={afterDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
