import { useEffect, useState } from "react"
import type { Users } from "../types/users_type"
import { fetchUsers } from "../users/users_api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Link, useNavigate } from "react-router-dom"

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch users and set state
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetchUsers()
        setUsers(res)
        setError(null)
      } catch (err) {
        setError(
          "Не удалось загрузить пользователей: " + (err as Error).message
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <div>Загрузка...</div>}

      {
        <div>
          <div className="flex align-center justify-between gap-4 mb-4 h-10">
            <input
              type="text"
              placeholder="Поиск по имени"
              className="w-[20rem] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="">
              <Link
                to="/create-user"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 border text-blue-600"
                aria-label="Создать студента"
              >
                Создать студента
              </Link>
            </div>
          </div>
          <Table>
            <TableCaption>Список студентов</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Имя</TableHead>
                <TableHead>Фамилия</TableHead>
                <TableHead>Телефон</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => navigate(`/student-info/${user.id}`)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.telNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    </>
  )
}
