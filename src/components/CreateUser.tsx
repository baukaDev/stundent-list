import { createUser } from "@/users/users_api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export const CreateUser: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [telNumber, setTelNumber] = useState<string>("")
  const [group, setGroup] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [kurs, setKurs] = useState<number>(1)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating user:", { firstName, lastName, email })

    try {
      const response = await createUser({
        firstName,
        lastName,
        email,
        telNumber,
        group,
        kurs,
      })

      return response.email
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      setFirstName("")
      setLastName("")
      setEmail("")
      setTelNumber("")
      setGroup("")
      setKurs(1)
    }

    navigate("/")
  }

  return (
    <>
      <div className="text-lg font-semibold text-gray-700 text-center">
        Create New User Page
      </div>
      <div className="lg:w-full xl:max-w-[60%] mx-auto mt-8 border border-gray-300 rounded-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex align-center justify-between gap-4 mb-8 h-10">
            <div>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                value={firstName}
                placeholder="Введите имя"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName">Фамилия:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                placeholder="Введите фамилию"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex align-center justify-between gap-4 mb-8 h-10">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Введите email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone">Телефон:</label>
              <input
                type="tel"
                id="phone"
                value={telNumber}
                placeholder="+998 90 123 45 67"
                onChange={(e) => setTelNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex align-center justify-between gap-4 mb-8">
            <div>
              <label htmlFor="group">Направления:</label>
              <input
                type="text"
                id="group"
                value={group}
                placeholder="Введите полное название"
                onChange={(e) => setGroup(e.target.value)}
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
                  >
                    <DropdownMenuRadioItem value="1">
                      1 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2">
                      2 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3">
                      3 курс
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4">
                      4 курс
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={() => navigate("/")}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Создать пользователя
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
