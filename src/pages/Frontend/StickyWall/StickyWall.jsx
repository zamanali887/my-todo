import React, { useState, } from 'react'
import { firestore } from 'config/firebase';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { message } from 'antd';

import { AiOutlinePlus } from "react-icons/ai"
import { RxCrossCircled } from "react-icons/rx"
import { BiPencil } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

import { useAuthContext } from 'contexts/AuthContext';
import { useFetchTodoContext } from 'contexts/FetchTodoContext';
import { useFetchTodoList } from 'contexts/FetchTodoList';
import { useFetchDeletedTodo } from 'contexts/FetchDeletedTodo';
import { Button } from 'antd';


let initialValue = { title: "", date: "", list: "", color: "", description: "" }

export default function Stickywall() {

    const [state, setState] = useState(initialValue);
    const [stateTodo, setStateTodo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { user } = useAuthContext();
    const { getList } = useFetchTodoList();
    const { getTodos, setGetTodos } = useFetchTodoContext();
    const { deletedTodos } = useFetchDeletedTodo();




    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleAddTodo = async (e) => {
        e.preventDefault();

        let { title, date, list, color, description } = state

        title = title.trim();
        description = description.trim();

        if (title < 3) {
            return message.error("Please Enter Title Correctly")
        }
        if (description < 10) {
            return message.error("Please Enter Description Correctly")
        }

        const selectedList = getList.find((lists) => lists.listItem === list)

        const data = {
            title, date,
            newlist: {
                name: selectedList.listItem,
                id: selectedList.id
            }, color, description,
            dateCreated: serverTimestamp(),
            id: Math.random().toString(36).slice(2),
            status: "active",
            createdBy: {
                userName: user.fullName,
                email: user.email,
                uid: user.uid
            }
        }
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "todos", data.id), data);

            message.success("A New Todo Added Successfully");
            getTodos.push(data)
            setState(initialValue);

        } catch (e) {
            console.error("Error adding document: ", e);
            message.error("SomeThing went Wrong")
        }
        setIsLoading(false)
    }

    const handleUpdate = (todo) => {
        setState(todo)
        setIsProcessing(true)
    }
    const afterUpdate = async () => {
        let { title, date, list, color, description, id } = state
        const selectedList = getList.find((lists) => lists.listItem === list)
        const updateData = {
            title, date, color, description, id,
            newlist: {
                name: selectedList.listItem,
                id: selectedList.id
            }
        }
        console.log('data', updateData)
        const updateTodos = getTodos.map(oldTodos => {
            if (oldTodos.id === updateData.id)
                return updateData
            return oldTodos
        })
        setGetTodos(updateTodos)
        try {
            await updateDoc(doc(firestore, "todos", updateData.id), updateData);

            message.success("Todo Updated Successfully")
            setState(initialValue)
            setIsProcessing(false)

        } catch (e) {
            message.error("SomeThing went Wrong While Updating Todo")
        }
    }
    // Deleting todo
    const handleDelete = async (abc) => {
        setStateTodo(abc)
    }
    const afterDeleting = async () => {

        try {
            await setDoc(doc(firestore, "todos", stateTodo.id), { status: "inActive" }, { merge: true });
            let todosAfterDelete = getTodos.filter(doc => doc.id !== stateTodo.id)
            let deleteTodo = getTodos.find(doc => doc.id === stateTodo.id)
            message.success("Todo Deleted Successfully")
            setGetTodos(todosAfterDelete)
            deletedTodos.push(deleteTodo)
        } catch (e) {
            message.error("SomeThing went Wrong While Updating Todo")
        }
    }
    return (
        <>
            <div className="container vh-100">
                <div className="row px-0">
                    <div className="col px-1">
                        <h1>Sticky Wall</h1>
                    </div>
                </div>
                <div className="row mt-4 px-0">
                    {
                        getTodos.map((todo, i) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4" style={{ height: "40vh" }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-between flex-column m-2 rounded-4 overflow-scroll abc" style={{ background: todo.color ? todo.color : " ", height: "38vh" }}>
                                            <div className="row mt-3 ">
                                                <div className="col">
                                                    <h4> {todo.title} </h4>
                                                </div>
                                                <div className="col-4 col-md-3 me-1">
                                                    <div className='row text-end'>
                                                        <div className='col px-0'><span className='bg-white text-info rounded px-1 pb-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleUpdate(todo)} ><BiPencil /></span></div>
                                                        <div className='col px-0'><span className='bg-white rounded text-danger px-1 pb-1' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleDelete(todo) }}> <AiFillDelete /></span></div>


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

                    <div className='col col-md-4 px-0 mt-2 bg-light d-flex justify-content-center align-items-center rounded-4' style={{ height: "39vh" }}>
                        <button className='btn w-100 h-100 btn-outline-light' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal"> <span className='text-dark'> <AiOutlinePlus size={40} /></span> </button>
                    </div>
                </div>
            </div>

            {/* Modal of add new todo */}

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Todo </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className='form-control' name='title' value={state.title} onChange={handleChange} placeholder='please Enter Todo Title' required />

                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <input type="date" className='form-control' name='date' value={state.date} onChange={handleChange} required />
                                    </div>

                                    <div className="col px-0">
                                        <select class="form-select form-select-md mb-3" aria-label=".form-select-lg example" name='list' onChange={handleChange}>
                                            {
                                                getList.map((list, i) => {
                                                    return (
                                                        <option >{list.listItem}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col d-flex justify-content-center px-0">
                                        <input type="color" className="form-control form-control-color" name='color' value={state.color} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <textarea name="description" className='form-control' cols="10" rows="3" value={state.description} onChange={handleChange} required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    !isProcessing ?
                                        <Button type='light' className='btn w-25' size='large' data-bs-dismiss="modal" loading={isLoading} style={{ background: "#e9ecef" }} onClick={handleAddTodo} >Add</Button>
                                        : <Button type='light' className='btn w-25' size='large' data-bs-dismiss="modal" loading={isLoading} style={{ background: "#e9ecef" }} onClick={afterUpdate} >Update</Button>
                                }

                            </div>
                        </form>
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
                            <p>You want to move this Todo to the Recycle Bin?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={afterDeleting}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
