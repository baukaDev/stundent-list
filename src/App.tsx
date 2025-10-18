import { Route, Routes } from "react-router-dom"
import { UsersList } from "./components/UsersList"
import { CreateUser } from "./components/CreateUser"

function App() {
  return (
    <div className="max-w-[50%] mx-auto mt-8 border border-gray-300 rounded-lg p-4">
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </div>
  )
}

export default App
