import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const LayoutWebsite = () => {
  return (
    <div >
        <Header />
        <main><Outlet/></main>
        <Footer />
    </div>
  )
}

export default LayoutWebsite