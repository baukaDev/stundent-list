import { Route, Routes } from "react-router-dom"
import { UsersList } from "./components/UsersList"
import { CreateUser } from "./components/CreateUser"
import { DetailInfo } from "./components/DetailInfo"
import { EditUsers } from "./components/EditUsers"

function App() {
  return (
    <div className="max-w-[50%] mx-auto mt-8 border border-gray-300 rounded-lg p-4">
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/student-info/:id" element={<DetailInfo />} />
        <Route path="/edit-user/:id" element={<EditUsers />} />
      </Routes>
    </div>
  )
}

export default App
