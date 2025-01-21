import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import "./App.css";
import { useEffect, useState } from "react";
import { iQuestion } from "./interfaces";

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
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>{question.question}</li>
                ))}
            </ul>
        </>
    );
}

export default App;
