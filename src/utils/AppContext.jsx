import { createContext, useState, useEffect } from "react"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userService, setUserService] = useState("101")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const { name, password, service } = JSON.parse(storedUser)
      setUserName(name)
      setUserPassword(password)
      setUserService(service)
    }
  }, [])

  const loginUser = (name, password) => {
    setUserName(name)
    setUserPassword(password)
    localStorage.setItem("user", JSON.stringify({ name, password }))
  }

  const updateService = (service) => {
    setUserService(service)

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const { name, password } = JSON.parse(storedUser)
      localStorage.setItem("user", JSON.stringify({ name, password, service }))
    } else if (userName && userPassword) {
      localStorage.setItem("user", JSON.stringify({ name: userName, password: userPassword, service }))
    }
  }

  return (
    <AppContext.Provider value={{ userName, userPassword, loginUser, updateService, userService }}>
      {children}
    </AppContext.Provider>
  )
}