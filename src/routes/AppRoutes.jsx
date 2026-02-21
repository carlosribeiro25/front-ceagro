import { Routes, Route } from 'react-router-dom'
import Login from "../components/login"
import PrivateRoute from "../components/PrivateRoutes"
import Produtos from '../pages/pageProdutos/Produtos'
import HomePage from '../components/HomePage'
import Usuarios from '../pages/pageUsers/Usuarios'
import CriarProduto from '../pages/pageProdutos/criarProduto'
import DeletarProduto from '../pages/pageProdutos/deletarProduto'
import AtualizarProduto from '../pages/pageProdutos/AtualizarProduto'
import CriarUsuario from '../pages/pageUsers/CriarUsuario'
import DeletarUsuario from '../pages/pageUsers/DeletarUsuario'
import AtualizarUsuario from '../pages/pageUsers/AtualizarUsuario'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />

            <Route path='/produtos' element={
                <PrivateRoute>
                    <Produtos />
                </PrivateRoute>
            } />

            <Route path='/criarProduto' element={
                <PrivateRoute>
                    <CriarProduto/>
                </PrivateRoute>
            } />

            <Route path='/deletarProduto' element={
                <PrivateRoute>
                    <DeletarProduto/>
                </PrivateRoute>
            } />

            <Route path='/atualizarProduto' element={
                <PrivateRoute>
                    <AtualizarProduto/>
                </PrivateRoute>
            } />

             <Route path='/usuarios' element={
                <PrivateRoute>
                    <Usuarios />
                </PrivateRoute>
            } />

            <Route path='/criarUsuario' element={
                <PrivateRoute>
                    <CriarUsuario/>
                </PrivateRoute>
            } />

            <Route path='/atualizarUsuario' element={
                <PrivateRoute>
                    <AtualizarUsuario/>
                </PrivateRoute>
            } />

            <Route path='/deletarUsuario' element={
                <PrivateRoute>
                    <DeletarUsuario/>
                </PrivateRoute>
            } />

            


            
        </Routes>
    )
}