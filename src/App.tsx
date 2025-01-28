import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import "./App.css";
import { useEffect, useState } from "react";
import { iQuestion } from "./interfaces";
import cartman from "./assets/images/cartmanAvatar.png";
import freddy from "./assets/images/freddyAvatar.png";
import roblox from "./assets/images/robloxAvatar.png";
import piggy from "./assets/images/badAvatar.png";
import chill from "./assets/images/chillAvatar.png";
import { Player } from "./Player";

const key = import.meta.env.VITE_KEY || "";
const url = import.meta.env.VITE_URL || "";

const supabase = createClient(url, key);

function App() {
    const [questions, setQuestions] = useState<iQuestion[]>([]);
    const [thisPlayer, setThisPlayer] = useState<Player>(new Player(5, "thisPlayer"));
    const players: Player[] = [
        new Player(1, "Hooker"),
        new Player(2, "Joseph"),
        new Player(3, "Anal odfwet"),
        new Player(4, "Pila"),
      ];
   
    const [answer, setAnswer] = useState(0);
    const [answers, setAnswers] = useState<Player[]>([]);
    const [submit, setSubmit] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<iQuestion>({id:0, question:"", correct_ans:0});
    const [answerInputContainer, setAnswerInputContainer] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisPlayer(thisPlayer.setAnswer(parseFloat(e.target.value)));
  };

  const handleSubmit = () => {
    if(!submit){
        const element = document.getElementById("answerInputContainer");
        if (element) {
          element.style.display = "none";
          players.map(player=>{
            console.log(currentQuestion.correct_ans)            
            player.randomAnswer(currentQuestion?.correct_ans );
            setAnswers([...players, thisPlayer].sort((a, b) => b.currentAnswer - a.currentAnswer));
        })
        }
    }
    setSubmit(!submit);
  };


    useEffect(() => {

        getQuestions();
        // if(questions[currentQuestion.id+1]){
        //     setCurrentQuestion(questions[currentQuestion.id+1]);

        // }
        
    },[]);

    async function getQuestions() {
        const response: PostgrestSingleResponse<iQuestion[]> = await supabase
            .from("questions")
            .select();
        setQuestions(response.data || []);
        if(response.data){
            setCurrentQuestion(response.data[0])
        }
    }

    return (
        <>
        
            
            <div className="title">Ryzykowany naukowiec</div>
            <div className="table">                
            <div className="player1 player">
                <div className="nick">Chujel</div>
                <img src={roblox} alt="cartman" className="avatar" />
                <div className="moneyAmount">$0</div>
            </div>
            <div className="player2 player">
                <div className="nick">Boguś</div>
                <img src={freddy} alt="freddy" className="avatar" />
                <div className="moneyAmount">$300</div>
            </div>
            <div className="player3 player">
                <div className="nick">Żetarrow</div>
                <img src={cartman} alt="roblox" className="avatar" />
                <div className="moneyAmount">$256</div>
            </div>
            <div className="player4 player">
                <div className="nick">Amelka</div>
                <img src={chill} alt="chill" className="avatar" />
                <div className="moneyAmount">$10</div>
            </div>
            <div className="player5 player">
                <div className="nick">Kantorro</div>
                <img src={piggy} alt="piggy" className="avatar" />
                <div className="moneyAmount">$4009</div>
            </div>

            <div className="question">
                <div>{questions[0]?.question}</div>
                {/* {questions.map((question) => (
                    <div key={question.id}>{question.question}</div >
                ))} */}
            </div>
            
            <div className="cardsContainer">
                {answers[1] ? 
                    answers.map(record=>{
                        
                console.log(answers);
                        return <div className={"cardSlot player" + record.id}>{record.currentAnswer}</div>
                    })
                :
                (<>
                    <div className="cardSlot"></div>
                    <div className="cardSlot"></div>
                    <div className="cardSlot"></div>
                    <div className="cardSlot"></div>
                    <div className="cardSlot"></div>
                    </>) }
                <div className="lower">Lower</div>
            </div>
            
            
            {answerInputContainer? <div className="flex row" id="answerInputContainer">
            
            <input type="number" id="questionInput" className="questionInput" placeholder="Input answer" onChange={handleChange} readOnly={submit} />
            {submit? "": <button type="submit" className="tick" onClick={handleSubmit}>	&#10003;</button>}
            {submit ? <button type="submit" className="tick x" onClick={handleSubmit}>	&#x2715;</button> : ""}
            </div> : ""}
            </div>
            
        </>
    );
}

export default App;
