import CategoryCard from '@/components/Preferences/CategoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/types';
import { clearStore } from '@/features/question/questionSlice';
import { useEffect, useState } from 'react';

export default function Results() {
    const [showAnswers, setShowAnswers] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const results = useSelector((state: RootState) => state.question.results);
    const questions = useSelector(
        (state: RootState) => state.question.questions
    );
    const answers = useSelector((state: RootState) => state.question.answers);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (results.total === 0) {
            navigate('/');
        }
    }, [results.total, navigate]);
    const goToNewQuiz = () => {
        dispatch(clearStore());
        navigate('/preferences');
    };

    const percentage = (results.correctAnswers * 100) / results.total;

    const colorByDifficulty = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-400 text-green-700';
            case 'medium':
                return 'bg-yellow-400 text-yellow-700';
            case 'hard':
                return 'bg-red-400 text-red-700';
            default:
                return 'bg-teal-400 text-teal-700';
        }
    };

    const labels = ['a', 'b', 'c', 'd'];

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    let renderCounter = 0;

    return (
        <div className="w-full text-xl mt-16">
            <h1 className="text-3xl font-bold mb-6">Results</h1>
            <div className="gap-14 flex flex-col">
                <div>
                    <h1 className="mb-4 font-bold">Category</h1>
                    <CategoryCard
                        name={results.category.name}
                        src={results.category.src}
                        isSelected={true}
                        classes={'h-24 w-full'}
                    />
                </div>
                <div className="text-center flex justify-evenly items-center">
                    <div>
                        <div>Answers</div>
                        <div className="font-bold">
                            {results.correctAnswers} / {results.total}
                        </div>
                    </div>
                    <div className="text-4xl font-bold bg-teal-600 p-3 rounded-lg relative">
                        {percentage}%
                        <div
                            className={`absolute text-sm -translate-x-1/2 -bottom-2 left-1/2 px-1 rounded-sm ${colorByDifficulty(results.difficulty)}`}
                        >
                            {results.difficulty}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <button
                        className=" bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12"
                        onClick={goToNewQuiz}
                    >
                        New Quiz
                    </button>
                    <button
                        className=" bg-slate-400 text-slate-800 rounded-lg hover:bg-slate-200 transition duration-100 h-12"
                        onClick={() => setShowAnswers(!showAnswers)}
                    >
                        {showAnswers ? 'Hide Answers' : 'Show Answers'}
                    </button>
                </div>
                {showAnswers && (
                    <div className="grid grid-cols-1 rounded-lg">
                        <div className='px-4 pt-3 pb-1 bg-slate-900 rounded-t-lg'>

                      
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCorrectAnswers}
                                className="sr-only peer"
                                onChange={() =>
                                    setShowCorrectAnswers(!showCorrectAnswers)
                                }
                            />
                            <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer bg-teal-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-teal-600 peer-checked:bg-teal-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Show correct answers
                            </span>
                        </label>
                        </div>
                        {questions.map((question, index) => {
                            if (
                                !showCorrectAnswers &&
                                question.correct_answer !== answers[index]
                            ) {
                                const bgClass = renderCounter % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700';
                                    renderCounter++;
                                return (
                                    <div key={index} className={`${bgClass} p-3 rounded-sm`}>
                                        <div className="font-semibold mb-3">
                                            {index + 1}.{' '}
                                            {decodeHtml(question.question)}
                                        </div>
                                        <div className="bg-green-600  rounded-md py-1 px-2">
                                            a){' '}
                                            {decodeHtml(
                                                question.correct_answer
                                            )}
                                        </div>
                                        <div className="">
                                            {question.incorrect_answers.map(
                                                (answer, i) => {
                                                    return answer ===
                                                    answers[index] ? (
                                                        <div
                                                            key={i}
                                                            className="bg-red-500 font-bold rounded-md py-1 px-2"
                                                        >
                                                            {labels[i + 1]}){' '}
                                                            {decodeHtml(answer)}
                                                        </div>
                                                    ) : (
                                                        <div key={i} className='rounded-md py-1 px-2'>
                                                            {labels[i + 1]}){' '}
                                                            {decodeHtml(answer)}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            if (showCorrectAnswers) {
                                const bgClass = renderCounter % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700';
                                    renderCounter++;
                                return (
                                    <div key={index} className={`${bgClass} p-3 rounded-sm`}>
                                        <div className="font-semibold mb-3">
                                            {index + 1}.{' '}
                                            {decodeHtml(question.question)}
                                        </div>
                                        {question.correct_answer ===
                                        answers[index] ? (
                                            <div className="bg-green-600 font-bold rounded-md p-1 px-2">
                                                a){' '}
                                                {decodeHtml(
                                                    question.correct_answer
                                                )}
                                            </div>
                                        ) : (
                                            <div className="bg-green-600 rounded-md p-1 px-2">
                                                a){' '}
                                                {decodeHtml(
                                                    question.correct_answer
                                                )}
                                            </div>
                                        )}
                                        <div className="">
                                            {question.incorrect_answers.map(
                                                (answer, i) => {
                                                    return answer ===
                                                        answers[index] ? (
                                                        <div
                                                            key={i}
                                                            className="bg-red-500 font-bold rounded-md py-1 px-2"
                                                        >
                                                            {labels[i + 1]}){' '}
                                                            {decodeHtml(answer)}
                                                        </div>
                                                    ) : (
                                                        <div key={i} className='py-1 px-2'>
                                                            {labels[i + 1]}){' '}
                                                            {decodeHtml(answer)}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
