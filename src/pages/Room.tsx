import { useParams } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss'

type RoomParams = {
	id: string;
};


export function Room(){
    const params = useParams() as RoomParams;
    const roomId = params.id;
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Letmeask" />
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>NOME DA SALA</h1>
                    <span>4 peguntas</span>
                </div>
                <form>
                    <textarea 
                    placeholder='O que você quer perguntar?'
                    />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta <button type='button'>faça seu login</button></span>
                        <Button type='submit'>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}