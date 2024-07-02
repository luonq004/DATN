import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ShopPage = () => {
    return (
        <div>
            <p>Layout Shop-page</p>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Outlet />
            </ThemeProvider>
        </div>
    )
}

export default ShopPage
