import { type Users } from "@/types/users_type"
import { fetchUsers, updateUser } from "@/users/users_api"
import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export const EditUsers: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<Users | null>(null)
  const { id } = useParams<{ id: string }>()
  const [kurs, setKurs] = useState<number>(1)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Users>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers()
      const foundUser = response.find((u) => u.id === id) || null

      if (foundUser) {
        setUser(foundUser)
        reset({
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          telNumber: foundUser.telNumber,
          group: foundUser.group,
          kurs: foundUser.kurs,
        })
      }
    }
    fetchData()
  }, [id, reset])

  const onSubmit = async (data: Users) => {
    try {
      if (!id) return

      await updateUser(id, data)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <>
      <div className="lg:w-full xl:max-w-[60%] mx-auto mt-8 border border-gray-300 rounded-lg p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex align-center justify-between gap-4 mb-8 h-10">
            <div>
              <label htmlFor="name">Имя:</label>
              <input
                {...register("firstName", { required: true })}
                type="text"
                id="name"
                placeholder="Введите имя"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName">Фамилия:</label>
              <input
                {...register("lastName", { required: true })}
                type="text"
                id="lastName"
                placeholder="Введите фамилию"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex align-center justify-between gap-4 mb-8 h-10">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="Введите email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone">Телефон:</label>
              <input
                {...register("telNumber", { required: true })}
                type="tel"
                id="phone"
                placeholder="+998 90 123 45 67"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex align-center justify-between gap-4 mb-8">
            <div>
              <label htmlFor="group">Направления:</label>
              <input
                {...register("group", { required: true })}
                type="text"
                id="group"
                placeholder="Введите полное название"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-block mt-6 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 border text-blue-600">
                    {`Курс: ${kurs}`}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Выберите курс</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={kurs.toString()}
                    onValueChange={(value) => setKurs(Number(value))}
                    {...register("kurs", { required: true })}
                  >
                    <DropdownMenuRadioItem
                      value="1"
                      {...register("kurs", { required: true })}
                    >
                      1 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="2"
                      {...register("kurs", { required: true })}
                    >
                      2 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="3"
                      {...register("kurs", { required: true })}
                    >
                      3 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4" {...register("kurs")}>
                      4 курс
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
              onClick={() => navigate("/")}
            >
              Save Changes
            </button>
            <button
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer mt-4"
              onClick={() => navigate("/")}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
