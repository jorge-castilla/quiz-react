import { useState, useEffect } from 'react';
import FixedTopContainer from '@/components/FixedTopContainer';
import FixedBottomContainer from '@/components/FixedBottomContainer';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
    goToNextQuestion,
    calculateResults,
} from '@/features/question/questionSlice';
import { RootState } from '@/store/types';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {
        // Seleccionar un elemento restante...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E intercambiarlo con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const answersSelector = createSelector(
    (state: RootState) =>
        state.question.questions[state.question.currentQuestionIndex],
    (question) => {
        if (question === undefined) return [];
        const answersArray = [
            ...question.incorrect_answers,
            question.correct_answer,
        ];
        return shuffleArray(answersArray);
    }
);
function Question() {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const navigate = useNavigate();

    const questions = useSelector(
        (state: RootState) => state.question.questions
    );

    useEffect(() => {
        if (questions.length === 0) {
            navigate('/');
        }
    }, [questions, navigate]);

    const currentQuestionIndex = useSelector(
        (state: RootState) => state.question.currentQuestionIndex
    );
    const currentQuestion = useSelector(
        (state: RootState) => state.question.questions[currentQuestionIndex]
    );

    const answers = useSelector(answersSelector);

    const labels = ['a', 'b', 'c', 'd'];

    const loading = useSelector((state: RootState) => state.question.loading);
    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };
    const dispatch = useDispatch();
    const nextQuestion = () => {
        if (selectedAnswer === null) return;
        if (currentQuestionIndex === questions.length - 1) {
            dispatch(calculateResults(answers[selectedAnswer]));
            navigate('/results');
            setSelectedAnswer(null);
        } else {
            dispatch(goToNextQuestion(answers[selectedAnswer]));
            setSelectedAnswer(null);
        }
    };

    return (
        <>
            {questions.length > 0 && (
                <>
                    <FixedTopContainer>
                        <h1 className="text-xl font-bold mb-2 text-slate-100">
                            Question {currentQuestionIndex + 1} of{' '}
                            {questions.length}
                        </h1>
                        {!loading ? (
                            <h1 className="text-lg text-slate-200">
                                {decodeHtml(currentQuestion.question)}
                            </h1>
                        ) : (
                            <h1 className="text-lg text-slate-200">
                                Loading...
                            </h1>
                        )}
                    </FixedTopContainer>
                    <div className="w-full h-screen mt-52 flex flex-col gap-4">
                        {answers.map((answer, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`px-3 py-4 bg-slate-800 rounded-lg text-lg text-slate-200 ${selectedAnswer === index ? 'bg-teal-500' : 'hover:bg-slate-700 transition duration-100'}`}
                                    onClick={() => setSelectedAnswer(index)}
                                >
                                    <span className="font-bold mr-2">
                                        {labels[index]}){' '}
                                    </span>
                                    {decodeHtml(answer)}
                                </div>
                            );
                        })}
                    </div>
                    <FixedBottomContainer>
                        <div className="flex w-full justify-end">
                            <button
                                className="w-1/3 bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12"
                                onClick={nextQuestion}
                            >
                                {currentQuestionIndex === questions.length - 1
                                    ? 'Finish Quiz'
                                    : 'Next Question'}
                            </button>
                        </div>
                    </FixedBottomContainer>
                </>
            )}
        </>
    );
}

export default Question;
