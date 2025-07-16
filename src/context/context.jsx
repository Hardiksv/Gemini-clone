import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)

    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let resultText
        if (prompt !== undefined) {
            resultText =await main(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            resultText = await main(input)
        }

        let resultTextArray = resultText.split("**");
        let newResult = " ";
        for (let i = 0; i < resultTextArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResult += resultTextArray[i];

            }
            else {
                newResult += "<b>" + resultTextArray[i] + "</b>";
            }
        }
        let newResult2 = newResult.split("*").join("</br>");
        let newResultArray = newResult2.split(" ");
        for (let i = 0; i < newResultArray.length; i++) {
            const nextWord = newResultArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")

    }



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider