import { Link } from "react-router-dom";

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';

import { useAuth } from '../hooks/useAuth';

export function NewRoom(){
    const {user} = useAuth();

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="illustration" />
                <h1>Crie salas de Q&A ao vivo</h1>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logo} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input 
                            type="text" 
                            placeholder='Nome da sala'
                        />
                        <br />
                        <Button type="submit">Criar Sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}