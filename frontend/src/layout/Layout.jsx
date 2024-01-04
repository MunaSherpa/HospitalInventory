import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Register from '../pages/auth/register/Register'
import Login from '../pages/auth/login/Login'

import Home from '../pages/home/Home'
import Routers from '../routes/Routers'
const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout