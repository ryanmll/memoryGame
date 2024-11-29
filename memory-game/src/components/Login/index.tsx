import './style.css'
import { Link } from "react-router-dom";

export default function Login() {


    return (
        <>
            <div className="container">
                <h1>
                    Drawing Memory Game
                </h1>

                <form className='form-input-name-login' action="">
                    <input id="input-name-login" type="text" placeholder="Insira seu nome" />
                    
                    <Link to={"Grid"}>
                        <button id="btn-entrar">
                            Login
                        </button>
                    </Link>
                </form>

            </div>
        </>
    )
}