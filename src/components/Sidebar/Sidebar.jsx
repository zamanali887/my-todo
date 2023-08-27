import React, { useState } from 'react'

import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, firestore } from 'config/firebase'
import { message } from 'antd'


import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { TfiMenuAlt } from 'react-icons/tfi'
import { BsCalendar2Month } from 'react-icons/bs'
import { MdStickyNote2 } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSolidCheckbox } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'


import { signOut } from 'firebase/auth'
import { useAuthContext } from 'contexts/AuthContext'
import { useFetchTodoList } from 'contexts/FetchTodoList'
import { Link } from 'react-router-dom'
import { Button } from 'antd'


const initialValue = { listItem: "", color: '' }

export default function Sidebar() {


  const [state, setState] = useState(initialValue);
  const [hideList, setHideList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext()
  const { getList } = useFetchTodoList();


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const hideListForm = () => {
    setHideList(current => !current);
  }



  // function to add new list

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { listItem, color } = state

    listItem = listItem.trim().toLocaleLowerCase();

    const data = {
      listItem,
      id: Math.random().toString(36).slice(2),
      dateCreated: serverTimestamp(),
      color,
      status: "active",
    }
    setIsLoading(true)
    try {

      await setDoc(doc(firestore, 'list', data.id), data);
      message.success("New List Added SuccessFuly");
      getList.push(data)
      setState(initialValue);
    }
    catch (e) {
      message.error("Something Went Wrong While Adding New List")
    }
    setIsLoading(false)
  }

  //*****End*****//
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        message.success("Signout successful")
        dispatch({ type: "SET_LOGGED_OUT" })
      })
      .catch(err => {
        message.error("Signout not successful")
      })
  }


  return (
    <>
      <div className="container py-3">
        <div className="row py-2">
          <div className="py-2 bg-light rounded-3">
            <div className="row px-1">
              <div className="col d-none d-md-block"> <h4>Menu</h4> </div>
              <div className="col text-start text-md-end"> <AiOutlineMenu size={20} /> </div>
            </div>
            <div className='d-flex justify-content-between flex-column vh-100' id='sidebar'>
              <div>
                <h6 className='mt-3 px-2' >Task</h6>
                <ul className="nav nav-pills flex-column px-1" >
                  <li className="nav-item text-dark mb-3 ">
                    <Link to="/upcoming" className="nav-link text-dark  text-decoration-none py-1">
                      <MdOutlineKeyboardDoubleArrowRight size={18} />
                      <span className='d-none d-sm-inline ms-2'>UpComming</span>
                    </Link>
                  </li>
                  <li className="nav-item text-dark mb-3">
                    <Link to="/" className="nav-link text-dark  text-decoration-none py-1">
                      <TfiMenuAlt size={18} />
                      <span className='d-none d-sm-inline ms-2'>Today</span>
                    </Link>
                  </li>
                  <li className="nav-item text-dark   mb-3">
                    <Link to='/calendar' className="nav-link text-dark text-decoration-none py-1">
                      <BsCalendar2Month size={18} />
                      <span className='d-none d-sm-inline ms-2'>Calendar</span>
                    </Link>
                  </li>
                  <li className="nav-item text-dark mb-3">
                    <Link to="/stickywall" className="nav-link text-dark  text-decoration-none py-1">
                      <MdStickyNote2 size={18} />
                      <span className='d-none d-sm-inline ms-2'>Sticky Wall</span>
                    </Link>
                  </li>
                </ul>
                <h6 className='mt-3 px-2' >List</h6>
                <ul className="nav nav-pills flex-column px-1" >
                  {
                    getList.map((list) => {
                      return (
                        <>
                          <li className="nav-item text-dark mb-1 ">
                            <Link to={`/list/${list.id}`} className="nav-link text-dark  text-decoration-none py-1">
                              <BiSolidCheckbox size={22} style={{ color: list.color }} />
                              <span className='d-none d-sm-inline ms-2' style={{ textTransform: 'capitalize' }}>{list.listItem}</span>
                            </Link>
                          </li>
                        </>
                      )
                    })
                  }
                  <li className="nav-item text-dark mb-3" onClick={() => hideListForm()} >
                    <div className="nav-link text-dark  text-decoration-none py-1">
                      <AiOutlinePlus size={18} />
                      <span className='d-none d-sm-inline ms-2' >Add New List</span>
                    </div>
                  </li>
                </ul>

                <form onSubmit={handleSubmit} className={`${hideList ? "d-block" : 'd-none'} `} >
                  <div className="row mx-0">
                    <div className="col-12 col-md-9 col-xl-10 px-0 px-md-1">
                      <input className='form-control form-control-sm rounded-2' type="text" name='listItem' placeholder='New List Name' value={state.listItem} onChange={handleChange} />

                    </div>
                    <div className="col col-md-1 px-0 me-2">
                      <input type="color" className="form-control form-control-sm form-control-color" name='color' value={state.color} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-2 mx-1  text-end">
                      <Button htmlType='submit' type='light' className='btn w-100' loading={isLoading} style={{ background: "#e9ecef" }}>Add</Button>
                    </div>
                  </div>
                </form>
                <h6 className='mt-3 px-2' >Recently Deleted</h6>
                <ul className="nav nav-pills flex-column px-1" >
                  <li className="nav-item text-dark mb-3 ">
                    <Link to="/deleted" className="nav-link text-dark  text-decoration-none py-1">
                      <AiFillDelete size={18} className='text-danger' />
                      <span className='d-none d-sm-inline ms-2'>Recycle Bin</span>
                    </Link>
                  </li>

                </ul>
              </div>
              <div>
                <div className='row mb-3 px-2'>
                  <div className="col-12 text-center">
                    <button className='btn px-2 w-100' style={{ background: "#e9ecef" }} onClick={handleLogout}><Link to="/auth/login" className='text-decoration-none'>
                      <BiLogOut size={20} />
                      <span className='d-none d-sm-inline'>  Logout</span></Link></button>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
