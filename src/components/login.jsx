
import { useState } from 'react'
import { api } from '../lib/Api';
import { useNavigate} from 'react-router-dom'
import { InputText } from "primereact/inputtext";
import { Link } from 'react-router-dom';

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
    <div className='mt-20 w-2xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto  shadow-md opacity-80 h-65 p-2  rounded-xl  overflow-hidden justify-center '>
        <form 
        onSubmit={handleSubmit}>
            <h1 className='text-center  pb-2 pt-1 font-medium text-3xl text-gray-600'> Login Ceagro</h1>
           <div className='text-center p-2'>
            <InputText
            className='w-full'
            type="email"
            value={email}
            name="email" id="email" 
            placeholder="E-mail"
            required 
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>

           <div className='text-center p-2  '>
            <InputText
            className='w-full'
            value={password}
            type="password" 
            name="password" id="password" 
            placeholder= "Senha"
            required 
            onChange={(e) => setPassword(e.target.value)}
             />
             </div>
           
           <div className='text-center'>
            <button  className='text-center  cursor-pointer w-3xs p-1 bg-sky-500 hover:bg-sky-600 text-amber-50 min-w-2/4 rounded-sm'type="submit">Acessar</button>
            <Link to='/login/usuarios/cadastrarUsuarios' > Cadastre-se</Link>
           </div>
        </form>
    </div>
        
    )
}

