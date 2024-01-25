import CategoryCard from './CategoryCard';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '@/features/question/questionSlice';
import { RootState } from '@/store/types';
import FixedTopContainer from '@/components/FixedTopContainer';
import FixedBottomContainer from '@/components/FixedBottomContainer';

interface Category {
    id: number;
    name: string;
    src: string;
}

interface CategoryPickerProps {
    setActiveSection: (section: string) => void;
}

const categories: Array<Category> = [
    { id: 9, name: 'General Knowledge', src: '/categories/9.jpg' },
    { id: 10, name: 'Books', src: '/categories/10.jpg' },
    { id: 11, name: 'Films', src: '/categories/11.jpg' },
    { id: 12, name: 'Music', src: '/categories/12.jpg' },
    { id: 17, name: 'Science & Nature', src: '/categories/17.jpg' },
    { id: 20, name: 'Mythology', src: '/categories/20.jpg' },
    { id: 22, name: 'Geography', src: '/categories/22.jpg' },
    { id: 23, name: 'History', src: '/categories/23.jpg' },
    { id: 25, name: 'Art', src: '/categories/25.jpg' },
    { id: 27, name: 'Animals', src: '/categories/27.jpg' },
    { id: 29, name: 'Comics', src: '/categories/29.jpg' },
    { id: 31, name: 'Manga', src: '/categories/31.jpg' },
];

const CategoryPicker: FC<CategoryPickerProps> = ({ setActiveSection }) => {
    const selectedCategory = useSelector(
        (state: RootState) => state.question.ApiOptions.category
    );
    const dispatch = useDispatch();
    return (
        <>
            <FixedTopContainer>
                <h1 className="text-lg sm:text-2xl font-bold">
                    Pick a category from the list
                </h1>
            </FixedTopContainer>
            <div className=" w-full mb-auto mt-16">
                <div className="grid grid-cols-2 gap-3 mb-24 mt-14">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => dispatch(setCategory(category))}
                        >
                            <CategoryCard
                                name={category.name}
                                src={category.src}
                                isSelected={
                                    selectedCategory &&
                                    category.id === selectedCategory.id
                                }
                            />
                        </div>
                    ))}
                </div>
                <FixedBottomContainer>
                    <div className=" w-2/3">
                        <div className="text-slate-400">Category:</div>
                        <div className="font-bold">{selectedCategory.name}</div>
                    </div>
                    <button
                        className="w-1/3 bg-teal-500 text-slate-800 rounded-lg hover:bg-teal-400 transition duration-100 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedCategory.id}
                        onClick={() => setActiveSection('options')}
                    >
                        Continue
                    </button>
                </FixedBottomContainer>
            </div>
        </>
    );
};
export default CategoryPicker;
