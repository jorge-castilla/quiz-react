import CategoryCard from '@/components/Preferences/CategoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/types';
import { clearStore } from '@/features/question/questionSlice';
import { useEffect } from 'react';

export default function Results() {
    const results = useSelector((state: RootState) => state.question.results);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (results.total === 0) {
            navigate('/');
        }
    }, [results.total, navigate])
    const goToNewQuiz = () => {
        dispatch(clearStore());
        navigate('/preferences');
    };

    const percentage = results.correctAnswers * 100 / results.total;

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
    }

    return (
        <div className="w-full text-xl">
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
                        <div className="font-bold">{results.correctAnswers} / {results.total}</div>
                    </div>
                    <div className="text-4xl font-bold bg-teal-600 p-3 rounded-lg relative">
                        {percentage}%
                        <div className={`absolute text-sm -translate-x-1/2 -bottom-2 left-1/2 px-1 rounded-sm ${colorByDifficulty(results.difficulty)}`}>
                            {results.difficulty}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <button className=" bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12"
                    onClick={goToNewQuiz}>
                        New Quiz
                    </button>
                    {/* <button className=" bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12">
                        Repeat preferences
                    </button> */}
                </div>
            </div>
        </div>
    );
}
