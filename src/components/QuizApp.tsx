    import { useState } from "react";
    import questions from "../questions";
    
    export default function QuizApp() {
    const [handlePrevAndNext, setHandlePrevAndNext] = useState(1)
    const startIndex = (handlePrevAndNext - 1) * 1;
    const endIndex = startIndex + 1;
    return <div>
    {
    questions.slice(startIndex, endIndex).map((question) => (
    <Question key={question.questionId} {...question} />
    ))
    }
    
    {questions.length !== 0 &&
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <button disabled={startIndex === 0} onClick={() => setHandlePrevAndNext(p => p - 1)} >Prev</button>
    <button disabled={questions.length === endIndex} onClick={() => setHandlePrevAndNext(p => p + 1)}>Next</button>
    </div>
    }
    </div>
    }
    
    
    function Question(question) {
    return <div key={question.questionId} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <h4>{question.questionTitle}</h4>
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
    {question.answers.map((answer) => (
    <Answer key={answer.answerId} {...answer} />
    ))}
    </div>
    </div>
    }
    
    
    
    function Answer(answer) {
    const [isCorrect, setIsCorrect] = useState("grey");
    const handleSelectCorrect = (response: number) => {
    if (response) {
    setIsCorrect("green")
    }
    else {
    setIsCorrect("red")
    }
    }
    return <button disabled={isCorrect === "green" || isCorrect === "red"} onClick={() => handleSelectCorrect(answer.responseStatus)} style={{ background: `${isCorrect}`, padding: '12px', cursor: 'pointer' }} key={answer.answerId}>{answer.answer}</button>
    }