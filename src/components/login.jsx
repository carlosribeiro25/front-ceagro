
import { useState } from 'react'
import { api } from '../lib/Api';
import { useNavigate} from 'react-router-dom'

 export default function Login() {

    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (event) => {

        event.preventDefault()
       
       try {
         const { data } = await api.post('/login', {      
            email,
            password,
         }) 

        localStorage.setItem("token", data.token)
        navigate('/')

        } catch (error) {
        console.error("Error completo", error.response?.data || error.message)
        alert('Email ou senha inválidos')
       } 
}

 return (
        <form onSubmit={handleSubmit}>
            <h1>Fazer Login </h1>

            <input
            type="email"
            value={email}
            name="email" id="email" 
            placeholder="Digite seu E-mail"
            required 
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            value={password}
            type="password" 
            name="password" id="password" 
            placeholder="Digite sua senha"
            required 
            onChange={(e) => setPassword(e.target.value)}
             />

            <button type="submit">Acessar</button>

        </form>
    )
}

