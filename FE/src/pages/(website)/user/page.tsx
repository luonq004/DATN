import { Outlet } from "react-router-dom"

const ProfilePage = () => {
  return (
    <div className="flex">
        <Outlet/>
    </div>
  )
}

export default ProfilePage