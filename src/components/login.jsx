
import { useState } from 'react'
import { api } from '../lib/Api';
import { useNavigate} from 'react-router-dom'
import { InputText } from "primereact/inputtext";

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
        <form className='border mt-20 max-w-3/4 shadow-gray-200 h-60 rounded-xl m-auto justify-center'
        onSubmit={handleSubmit}>
            <h1 className='text-center font-medium text-2xl text-gray-600'>Fazer Login </h1>
           <div className='text-center p-2 '>
            <InputText
            className='w-3xs'
            type="email"
            value={email}
            name="email" id="email" 
            placeholder="E-mail"
            required 
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>

           <div className='text-center p-2 '>
            <InputText
            className='w-3xs'
            value={password}
            type="password" 
            name="password" id="password" 
            placeholder= "Senha"
            required 
            onChange={(e) => setPassword(e.target.value)}
             />
             </div>
           
           <div className='text-center'>
            <button  className='text-center w-3xs p-1 bg-sky-500 hover:bg-sky-600 text-amber-50 min-w-2/4 rounded-sm'type="submit">Acessar</button>
           </div>
        </form>
    )
}

