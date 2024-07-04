import { Outlet } from 'react-router-dom'

const LayoutWebsite = () => {
  return (
    <div >
        <main><Outlet/></main>
    </div>
  )
}

export default LayoutWebsite