import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import Home from '../pages/home/Home'
const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Home />
            </main>
            <Footer />
        </>
    )
}

export default Layout