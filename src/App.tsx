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
    const [thisPlayer, setThisPlayer] = useState<Player>(
        new Player(5, "thisPlayer", 1000)
    );
    const [players, setPlayers] = useState([
        new Player(1, "Hooker", 1000),
        new Player(2, "Joseph", 1000),
        new Player(3, "Anal odfwet", 1000),
        new Player(4, "Pila", 1000),
    ]);

    const [answers, setAnswers] = useState<Player[]>([]);
    const [submit, setSubmit] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<iQuestion>({
        id: 0,
        question: "",
        correct_ans: 0,
    });
    const [answerInputContainer, setAnswerInputContainer] = useState(true);

    const [isMoneyInputShown, setIsMoneyInputShown] = useState<boolean>(false);
    const [bet, setBet] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThisPlayer(thisPlayer.setAnswer(parseFloat(e.target.value)));
    };

    const handleSubmit = () => {
        if (!submit) {
            const element = document.getElementById("answerInputContainer");
            if (element) {
                element.style.display = "none";
                players.map((player) => {
                    console.log(currentQuestion.correct_ans);
                    player.randomAnswer(currentQuestion?.correct_ans);
                    setAnswers(
                        [...players, thisPlayer].sort(
                            (a, b) => b.currentAnswer - a.currentAnswer
                        )
                    );
                });
            }
        }
        setSubmit(!submit);
        setIsMoneyInputShown(true);
    };

    useEffect(() => {
        getQuestions();
    }, []);

    async function getQuestions() {
        const response: PostgrestSingleResponse<iQuestion[]> = await supabase
            .from("questions")
            .select();
        setQuestions(response.data || []);
        console.log(response.data);
        if (response.data) {
            setCurrentQuestion(response.data[0]);
        }
    }

    function submitCash(): void {
        if (bet > thisPlayer.money) {
            alert("chyba cię pojebało");
            setBet(0);
            return;
        }
        setIsMoneyInputShown(false);
        setThisPlayer({ ...thisPlayer, money: thisPlayer.money - bet });
    }

    return (
        <>
            <div className="title">Ryzykowany naukowiec</div>
            <div className="table">
                <div className="player1 player">
                    <div className="nick">{players[0].nick}</div>
                    <img src={roblox} alt="Hooker avatar" className="avatar" />
                    <div className="moneyAmount">${players[0].money}</div>
                </div>
                <div className="player2 player">
                    <div className="nick">{players[1].nick}</div>
                    <img src={freddy} alt="Boguś avatar" className="avatar" />
                    <div className="moneyAmount">${players[1].money}</div>
                </div>
                <div className="player3 player">
                    <div className="nick">{players[2].nick}</div>
                    <img
                        src={cartman}
                        alt="Żetarrow avatar"
                        className="avatar"
                    />
                    <div className="moneyAmount">${players[2].money}</div>
                </div>
                <div className="player4 player">
                    <div className="nick">{players[3].nick}</div>
                    <img src={chill} alt="Amelka avatar" className="avatar" />
                    <div className="moneyAmount">${players[3].money}</div>
                </div>
                <div className="player5 player">
                    <div className="nick">{thisPlayer.nick}</div>
                    <img src={piggy} alt="Kantorro avatar" className="avatar" />
                    <div className="moneyAmount">${thisPlayer.money}</div>
                </div>

                <div className="question">
                    <div>{questions[0]?.question}</div>
                </div>

                <div className="cardsContainer">
                    {answers[1] ? (
                        answers.map((record) => {
                            console.log(answers);
                            return (
                                <div className={"cardSlot player" + record.id}>
                                    {record.currentAnswer}
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className="cardSlot"></div>
                            <div className="cardSlot"></div>
                            <div className="cardSlot"></div>
                            <div className="cardSlot"></div>
                            <div className="cardSlot"></div>
                        </>
                    )}
                    <div className="lower">Lower</div>
                </div>

                {answerInputContainer ? (
                    <div className="flex row" id="answerInputContainer">
                        <input
                            type="number"
                            id="questionInput"
                            className="questionInput"
                            placeholder="Input answer"
                            onChange={handleChange}
                            readOnly={submit}
                        />
                        {submit ? (
                            ""
                        ) : (
                            <button
                                type="submit"
                                className="tick"
                                onClick={handleSubmit}>
                                {" "}
                                &#10003;
                            </button>
                        )}
                        {submit ? (
                            <button
                                type="submit"
                                className="tick x"
                                onClick={handleSubmit}>
                                {" "}
                                &#x2715;
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                {isMoneyInputShown && (
                    <>
                        <input
                            type="number"
                            id="questionInput"
                            className="questionInput"
                            placeholder="Input answer"
                            onChange={(e) => {
                                setBet(+e.target.value);
                            }}
                        />
                        <button onClick={submitCash}>submit cash</button>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
