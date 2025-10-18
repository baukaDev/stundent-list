import axios from "axios"
import type { Users } from "../types/users_type"

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await axios.get(
    "https://68f28946b36f9750deecf3a7.mockapi.io/dash/v1/users"
  )
  console.log(response.data)
  return response.data
}

export const createUser = async (userData: {
  firstName: string
  lastName: string
  email: string
  telNumber: string
  group: string
  kurs: number
}): Promise<Users> => {
  const response = await axios.post(
    "https://68f28946b36f9750deecf3a7.mockapi.io/dash/v1/users",
    {
      // Example user data; in a real app, this would come from a form
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      telNumber: userData.telNumber,
      group: userData.group,
      kurs: userData.kurs,
    }
  )
  return response.data
}

export const fetchUserById = async (id: string): Promise<Users> => {
  const response = await axios.get(
    `https://68f28946b36f9750deecf3a7.mockapi.io/dash/v1/users/${id}`
  )
  return response.data
}
