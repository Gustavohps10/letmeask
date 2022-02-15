import { useNavigate, useParams } from 'react-router-dom';

import logo from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'
import { database } from '../services/firebse';

type RoomParams = {
	id: string;
};

export function AdminRoom(){
    // const {user} = useAuth();
    const navigate = useNavigate();
    const params = useParams() as RoomParams;
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Você tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        navigate("/");
    }
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Letmeask" />
                    <div className='buttons'>
                        <RoomCode code={roomId}></RoomCode>
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 ? (
                        <span>{questions.length} pegunta(s)</span>
                    ) : (
                        <span>Nenhuma pergunta</span>
                    )}
                </div>

                <div className="question-list">
                { questions.map(question =>{
                    return (
                        <Question
                            key={question.id}
                            author={question.author} 
                            content={question.content}
                        >

                        <button
                            className='delete-button'
                            type='button'
                            arial-label='Deletar Pergunta'
                            onClick={() => handleDeleteQuestion(question.id)}
                        >
                            <img src={deleteImg} alt="" />
                        </button>

                        </Question>
                    )
                })}
                </div>
               
            </main>
        </div>
    );
}