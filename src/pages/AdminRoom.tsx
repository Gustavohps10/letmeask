import { useNavigate, useParams } from 'react-router-dom';

import logo from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

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

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
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
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted}
                        >
                        
                        {!question.isAnswered && (
                            <>
                                <button
                                    className='check-button'
                                    type='button'
                                    arial-label='Marcar como respondida'
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="" />
                                </button>
        
                                <button
                                    className='highlight-button'
                                    type='button'
                                    arial-label='Dar destaque a pergunta'
                                    onClick={() => handleHighlightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Check" />
                                </button> 
                            </>
                        )}
                        

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