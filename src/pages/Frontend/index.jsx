import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Sidebar from 'components/Sidebar'
import UpComing from './UpComing'
import Today from './Today'
import StickyWall from './StickyWall'
import Calendar from './Calendar'
import ListedTodo from './ListedTodo/ListedTodo'
import Deleted from './Deleted/Deleted'

export default function Index() {
    return (
        <>
            <div className="container-fluid p-0 p-md-5" style={{ background: '#cfe0c3' }}>
                <div className="row bg-white m-4 rounded-4">
                    <div className="col-4 col-md-3"> <Sidebar /> </div>
                    <div className="col pe-2 px-0 my-4 overflow-scroll abc">
                        <Routes>
                            <Route path='/' element={<Today />} />
                            <Route path='upcoming' element={<UpComing />} />
                            <Route path='calendar' element={<Calendar />} />
                            <Route path='stickywall' element={<StickyWall />} />
                            <Route path='deleted' element={<Deleted />} />
                            <Route path='list/:id' element={<ListedTodo />} />
                            <Route path="*" element={<h1>404</h1>} />
                        </Routes>

                    </div>
                </div>
            </div>
        </>
    )
}
