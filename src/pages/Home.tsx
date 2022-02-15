import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg'
import googleIcon from  '../assets/images/google-icon.svg'

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { database } from '../services/firebse';

export function Home(){
    const navigate = useNavigate();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');
    
    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle()
        }
        navigate('rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if(!roomRef.exists()){
            alert('Room does not exists')
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.')
            return;
        }

        navigate(`rooms/${roomCode}`)
    }

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
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIcon} alt="Logo do Google" />
                        Crie sua sala com Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            onChange={event => setRoomCode(event.target.value)}
                            type="text" 
                            placeholder='Digite o código da sala'
                        />
                        <br />
                        <Button type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}