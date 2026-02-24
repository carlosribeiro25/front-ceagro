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
import ListaProdutos from '../pages/pageProdutos/ListarProdutos'
import { ListProduct } from '../pages/pageProdutos/ListProducts'
import Recebidos from '../pages/pageProdutos/Recebidos'
import Cadastro from '../pages/pageUsers/Cadastro'
import { Layout } from '../components/Layout'


export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/usuarios/cadastro' element={<Cadastro/>} />

             
            <Route path='/' element={
                <PrivateRoute>
                    <Layout>
                    <HomePage />
                    </Layout>
                    
                </PrivateRoute>
            } />
            

            <Route path='/produtos' element={
                <PrivateRoute>
                    <Layout>
                    <Produtos />
                    </Layout>              
                </PrivateRoute>
            } />

            <Route path='/produtos/listarProdutos' element={
                <PrivateRoute>
                    <Layout>
                    <ListaProdutos />
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/produtos/listProduct' element={
                <PrivateRoute>
                    <Layout>
                    <ListProduct />
                    </Layout>
                    
                </PrivateRoute>
            } />

            <Route path='/produtos/cadastrarProduto' element={
                <PrivateRoute>
                    <Layout>
                    <CriarProduto/>
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/produtos/deletarProduto' element={
                <PrivateRoute>
                    <Layout>
                    <DeletarProduto/>
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/produtos/recebidos' element={
                <PrivateRoute>
                    <Layout>
                    <Recebidos/>
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/produtos/atualizarProduto' element={
                <PrivateRoute>
                    <Layout>
                     <AtualizarProduto/>
                    </Layout>
                </PrivateRoute>
            } />

             <Route path='/usuarios' element={
                <PrivateRoute>
                     <Layout>
                        <Usuarios />
                     </Layout>
                </PrivateRoute>
            } />

            <Route path='/usuarios/cadastrarUsuarios' element={
                <PrivateRoute>
                    <CriarUsuario/>
                </PrivateRoute>
            } />

             <Route path='usuarios/cadastrarUsuarios' element={
                <PrivateRoute>
                    <Layout>
                    <CriarUsuario/>
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/usuarios/atualizarUsuario' element={
                <PrivateRoute>
                    <Layout>
                     <AtualizarUsuario/>
                    </Layout>
                </PrivateRoute>
            } />

            <Route path='/usuarios/deletarUsuario' element={
                <PrivateRoute>
                     <Layout>
                    <DeletarUsuario/>
                     </Layout>
                </PrivateRoute>
            } />
        </Routes>
    )
}