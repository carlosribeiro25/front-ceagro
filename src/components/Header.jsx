import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <section className="navbar  m-0 bg-base-100 shadow-sm flex justify-between">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-circle swap swap-rotate">
                            <input type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>


                            <svg
                                className="swap-on fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 512 512">
                                <polygon
                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label >
                        <ul
                            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60  p-2 shadow">
                            <li><Link to="/produtos">Produtos</Link></li>
                            <li><Link to="/produtos/listarProdutos">Compras da semana</Link ></li>
                            <li><Link to="/produtos/recebidos">Recebidos</Link></li>
                        </ul>


                    </div>
                </div>

                <h1 className=" text-accent text-2xl font-medium">Ceagro</h1>

                <div className="navbar-end">
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

