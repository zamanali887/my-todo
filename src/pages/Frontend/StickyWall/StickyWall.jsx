import React, { useEffect, useState, } from 'react'
import { firestore } from 'config/firebase';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { message } from 'antd';

import { AiOutlinePlus } from "react-icons/ai"
// import { BsThreeDotsVertical } from "react-icons/bs"


let initialValue = { title: "", date: "", list: "", color: "", description: "" }

export default function Stickywall() {

    const [state, setState] = useState(initialValue)
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState([])
    const [getTodo, setGetTodo] = useState([])



    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // ...
                setUsers(user)
            } else {
                // User is signed out
                console.log('user=>', 'User not found')
                // ...
            }
        });
    })

    const showUserdata = async () => {
        const querySnapshot = await getDocs(collection(firestore, "users"));

        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            docArray.push(data)
        });
        setUserData(docArray)
    }
    useEffect(() => {
        showUserdata();
    }, [])

    const logedinUser = userData.find((user) => { return user.id === users.id })


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
    }, [])


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

        const data = {
            title, date, list, color, description,
            dateCreated: serverTimestamp(),
            id: Math.random().toString(36).slice(2),
            status: "active",
            createdBy: {
                userName: logedinUser.fullName,
                email: logedinUser.email,
                uid: logedinUser.uid
            }
        }

        try {
            await setDoc(doc(firestore, "todos", data.id), data
            );
            // console.log("Document written with ID: ", docRef.id);
            message.success("A New Todo Added Successfully");
            showTodo();
            setState(initialValue);
        } catch (e) {
            console.error("Error adding document: ", e);
            message.error("SomeThing went Wrong")
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
                        getTodo.map((todo) => {
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

                    <div className='col col-md-4 px-0 mt-2 bg-light d-flex justify-content-center align-items-center rounded-4' style={{ height: "40vh" }}>
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
                        <form onSubmit={handleAddTodo}>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className='form-control' name='title' value={state.title} placeholder='Todo Title' onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <input type="date" className='form-control' name='date' value={state.date} onChange={handleChange} required />
                                    </div>

                                    <div className="col px-0">
                                        <input type="text" className='form-control' name='list' value={state.list} onChange={handleChange} required />
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
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button type="submit" className="btn" style={{ background: "#cfe0c3" }}>Add Todo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
