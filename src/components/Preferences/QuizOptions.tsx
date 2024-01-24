import {  useEffect } from 'react';
import DifficultyButton from '@/components/Preferences/DifficultyButton';
import RangeAndNumberInput from '@/components/Preferences/RangeAndNumberInput';
import CategoryCard from '@/components/Preferences/CategoryCard';
import FixedTopContainer from '@/components/FixedTopContainer';
import FixedBottomContainer from '@/components/FixedBottomContainer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/types';
import {
    setAmount,
    setDifficulty,
    fetchQuestions,
} from '@/features/question/questionSlice';
import { useNavigate } from 'react-router-dom';

const difficulties: Difficulty[] = [
    {
        name: 'easy',
        value: 'easy',
        colorClass: 'border-green-900',
        colorClassSelected: 'bg-green-500 border-green-900 font-bold',
    },
    {
        name: 'medium',
        value: 'medium',
        colorClass: 'border-yellow-900',
        colorClassSelected: 'bg-yellow-500 border-yellow-900 font-bold',
    },
    {
        name: 'hard',
        value: 'hard',
        colorClass: 'border-red-900',
        colorClassSelected: 'bg-red-500 border-red-900 font-bold',
    },
];

interface Difficulty {
    name: string;
    value: string;
    colorClass: string;
    colorClassSelected: string;
}
const QuizOptions = () => {
    const selectedCategory = useSelector(
        (state: RootState) => state.question.ApiOptions.category
    );
    const currentAmount = useSelector(
        (state: RootState) => state.question.ApiOptions.amount
    );
    const currentDifficulty = useSelector(
        (state: RootState) => state.question.ApiOptions.difficulty
    );
    const isLoading = useSelector((state: RootState) => state.question.loading);
    const questionsLength = useSelector(
        (state: RootState) => state.question.questions.length
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const StartQuiz = () => {
        dispatch(
            fetchQuestions({
                categoryId: selectedCategory.id,
                amount: currentAmount,
                difficulty: currentDifficulty,
            })
        );
    };
    useEffect(() => {
        if (!isLoading && questionsLength > 0) {
            navigate('/question');
        }
    }, [questionsLength, isLoading, navigate]);
    // const [selectedDifficulty, setSelectedDifficulty] = useState<
    //   Difficulty['value']
    // >(difficulties[0].value);
    return (
        <>
            <FixedTopContainer>
                <h1 className="text-2xl font-bold">Preferences</h1>
            </FixedTopContainer>
            <section className="grid grid-cols-1 gap-y-6 w-full text-slate-200 mb-auto mt-28">
                <div>
                    <div className="text-lg mb-2 font-bold">Category</div>
                    <CategoryCard
                        name={selectedCategory.name}
                        src={selectedCategory.src}
                        isSelected={true}
                        classes={'h-20 w-full'}
                    />
                </div>
                <div>
                    <div className="text-lg mb-2">Choose a difficulty:</div>
                    <div className="grid grid-cols-3 gap-2">
                        {difficulties.map(
                            ({
                                name,
                                value,
                                colorClass,
                                colorClassSelected,
                            }) => (
                                <DifficultyButton
                                    key={value}
                                    name={name}
                                    colorClass={colorClass}
                                    colorClassSelected={colorClassSelected}
                                    isSelected={currentDifficulty === value}
                                    onClick={() =>
                                        dispatch(setDifficulty(value))
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
                <div>
                    <div className="text-lg">
                        Select the quantity of questions:
                    </div>
                    <RangeAndNumberInput
                        value={currentAmount}
                        onChange={(value: number) => dispatch(setAmount(value))}
                    />
                </div>
                <FixedBottomContainer>
                    <div className="w-full flex justify-end">
                        <button
                            className="w-1/3 bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12"
                            onClick={() => StartQuiz()}
                        >
                            Start
                        </button>
                    </div>
                </FixedBottomContainer>
            </section>
        </>
    );
};

export default QuizOptions;
