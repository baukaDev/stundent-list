import type { Users } from "@/types/users_type"
import { deleteUser, fetchUserById } from "@/users/users_api"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export const DetailInfo: React.FC = () => {
  const [user, setUser] = useState<Users | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id)
      navigate("/")
    } catch (error) {
      console.error("Ошибка при удалении пользователя: ", error)
    }
  }

  const initials = (first?: string, last?: string) => {
    const a = (first ?? "").trim().charAt(0).toUpperCase() || ""
    const b = (last ?? "").trim().charAt(0).toUpperCase() || ""
    return a + b || "?"
  }

  if (loading)
    return (
      <div className="min-h-[240px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 animate-spin border-t-green-500" />
          <div className="text-sm text-muted-foreground">
            Загрузка данных...
          </div>
        </div>
      </div>
    )

  if (!user)
    return (
      <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-sm border border-border">
        <div className="text-center text-sm text-muted-foreground">
          Пользователь не найден
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
          >
            ← Назад
          </button>
        </div>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-card rounded-lg shadow-md border border-border">
      <div className="flex items-start gap-4">
        <div
          className="flex-none w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-semibold shadow"
          aria-hidden
        >
          {initials(user.firstName, user.lastName)}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-card-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                ID: <span className="font-mono">{user.id}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-2 bg-transparent border border-border rounded text-sm hover:bg-muted/10"
                aria-label="Назад"
              >
                ← Назад
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/5 rounded-md border border-border">
              <div className="text-xs text-muted-foreground">Телефон</div>
              <a
                href={`tel:${user.telNumber}`}
                className="mt-1 block text-sm text-primary hover:underline"
              >
                {user.telNumber || "—"}
              </a>
            </div>

            <div className="p-4 bg-muted/5 rounded-md border border-border">
              <div className="text-xs text-muted-foreground">Email</div>
              <a
                href={`mailto:${user.email}`}
                className="mt-1 block text-sm text-primary hover:underline"
              >
                {user.email || "—"}
              </a>
            </div>

            <div className="p-4 bg-muted/5 rounded-md border border-border">
              <div className="text-xs text-muted-foreground">Группа</div>
              <div className="mt-1 text-sm">{user.group || "—"}</div>
            </div>

            <div className="p-4 flex items-center justify-between bg-muted/5 rounded-md border border-border">
              <div>
                <div className="text-xs text-muted-foreground">Курс</div>
                <div className="mt-1 text-sm font-medium">
                  {user.kurs ?? "—"}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Статус</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4 justify-between">
              <div>
                <button className="p-4 bg-muted/5 rounded-md border border-border cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Изменить {user.firstName} {user.lastName}
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-4 bg-muted/5 rounded-md border border-border hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  Удалить {user.firstName} {user.lastName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
