import type { Users } from "@/types/users_type"
import { fetchUserById } from "@/users/users_api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const DetailInfo: React.FC = () => {
  const [user, setUser] = useState<Users | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    try {
      const fetchData = async () => {
        const res = await fetchUserById(id)
        setUser(res)
        setLoading(false)
      }
      fetchData()
    } catch (error) {
      console.error("Не удалось загрузить данные: ", error)
    }
  }, [id])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      Detail Info Component for user {id}
      {user && (
        <div>
          {user.firstName} {user.lastName}
        </div>
      )}
    </div>
  )
}
