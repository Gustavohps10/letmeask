import { useParams } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss'

type RoomParams = {
	id: string;
};

export function AdminRoom(){
    // const {user} = useAuth();
    const params = useParams() as RoomParams;
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Letmeask" />
                    <div className='buttons'>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 ? (
                        <span>{questions.length} peguntas</span>
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
                        />
                    )
                })}
                </div>
               
            </main>
        </div>
    );
}