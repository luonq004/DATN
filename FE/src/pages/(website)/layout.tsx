import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutWebsite = () => {
    return (
        <div>
            <h1>Layout Website</h1>
            <p>Header</p>
            <Outlet />
            <p>Footer</p>
        </div>
    )
}

export default LayoutWebsite
