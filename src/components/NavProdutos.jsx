import { NavLink } from "react-router-dom"

export default function NavProdutos() {
    return (
        <nav className="flex font-medium gap-4 mb-2 mt-1">

            <NavLink to="/produtos"
            end
                className={({ isActive, isTransitioning  }) =>
                    isActive
                        ? "border-b-4 border-accent text-accent"
                        : ""
                        
                    
                }>
                Produtos
            </NavLink>

            <NavLink to="/produtos/cadastrar"
                className={({ isActive, isTransitioning  }) =>
                    isActive
                        ? "border-b-4 border-accent text-accent"
                        : ""
                    
                }>
                Cadastrar
            </NavLink>

             
            

            <NavLink to="/produtos/deletar"
                className={({ isActive }) =>
                    isActive
                        ? "border-b-4 border-accent text-accent"
                        : ""
                        
                }>
                Deletar
            </NavLink>
            <NavLink to="/produtos/atualizar"
                className={({ isActive }) =>
                    isActive
                        ? "border-b-4 border-accent text-accent"
                        : ""
                }> Atualizar
            </NavLink>
        </nav>

    )
}

