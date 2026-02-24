
import { useState } from 'react'
import { api } from '../lib/Api';
import { useNavigate} from 'react-router-dom'
import { InputText } from "primereact/inputtext";
import { Link } from 'react-router-dom';
import Logo from '../components/Logo'

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
        alert('Email ou senha invalido')
        
       } 
}

 return (
    <div className='min-h-screen flex items-center justify-center p-2'>
    
    <section className='w-full max-w-sm  m-auto p-6 shadow-xl opacity-90 rounded-xl  overflow-hidden  '>
        <form 
        onSubmit={handleSubmit}>
           <div className='flex gap-14 items-center mb-2 '>
            <Logo/>
                <span className='pb-2 mt-2 font-medium text-3xl text-gray-900'>Ceagro</span>
           </div>

           <div className='p-1 flex flex-col mt-1 gap-0'>
            <label className='text-sm font-medium text-gray-500' htmlFor="email">E-mail</label>
            <InputText
            className='w-full focus:outline-none '
            type="email"
            value={email}
            name="email" id="email" 
            placeholder="Seu@email.com"
            required 
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>

           <div className='p-1 flex flex-col'>
            <label className='text-sm font-medium text-gray-500' htmlFor="password">Senha</label>
            <InputText
            className=' w-full'
            value={password}
            type="password" 
            name="password" id="password" 
            placeholder= "Sua*senha"
            required 
            onChange={(e) => setPassword(e.target.value)}
            
             />
            
             </div>
           
            <button  className='w-full text-center font-semibold p-2  cursor-pointer mt-2  bg-sky-500 hover:bg-sky-600 text-amber-50 min-w-2/4 rounded-sm'type="submit">Acessar</button>
            
            <div className='p-2 mt-2 gap-2 items-center flex '>
                <p className='mt-1'>Já tem cadastro?</p>
            <Link className='mt-1 text-blue-500' to='/usuarios/cadastro' >Cadastre-se</Link>

            </div>
           
        </form>
    </section>
    </div>
        
    )
}

