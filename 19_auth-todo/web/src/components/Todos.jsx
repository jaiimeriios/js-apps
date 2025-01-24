import { useAuthContext } from "../context/AuthContext"

const Todos = () => {

    const {user} = useAuthContext()
    console.log(user.user)

    return (
        <h1>Todos</h1>
    )
}

export default Todos