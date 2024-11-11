import { Outlet } from "react-router-dom"

const ProfilePage = () => {
  return (
    <div className="flex justify-center mb-20">
        <Outlet/>
    </div>
  )
}

export default ProfilePage