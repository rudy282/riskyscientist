import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import "./App.css";
import { useEffect, useState } from "react";
import { iQuestion } from "./interfaces";
import cartman from "./assets/images/cartmanAvatar.png";
import freddy from "./assets/images/freddyAvatar.png";
import roblox from "./assets/images/robloxAvatar.png";
import piggy from "./assets/images/badAvatar.png";
import chill from "./assets/images/chillAvatar.png";

const key = import.meta.env.VITE_KEY || "";
const url = import.meta.env.VITE_URL || "";

const supabase = createClient(url, key);

function App() {
    const [questions, setQuestions] = useState<iQuestion[]>([]);

    useEffect(() => {
        getQuestions();
    });

    async function getQuestions() {
        const response: PostgrestSingleResponse<iQuestion[]> = await supabase
            .from("questions")
            .select();
        setQuestions(response.data || []);
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
                {questions.map((question) => (
                    <div key={question.id}>{question.question}</div >
                ))}
            </div>
            
            <div className="cardsContainer">
                <div className="cardSlot"></div>
                <div className="cardSlot"></div>
                <div className="cardSlot"></div>
                <div className="cardSlot"></div>
                <div className="cardSlot"></div>
                <div className="lower">Lower</div>
            </div>
            
            <input type="text" id="questionInput" className="questionInput" placeholder="Input answer"/>
            </div>
            
        </>
    );
}

export default App;
