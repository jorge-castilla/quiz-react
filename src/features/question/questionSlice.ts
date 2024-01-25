import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiOptions, QuestionState } from '@/types/questionStore';
// src/features/myFeatureSlice.js

interface QuestionArg {
    categoryId: number;
    amount: number;
    difficulty: string;
}

export const fetchQuestions: any = createAsyncThunk(
    'question/fetchQuestions',
    async (arg: QuestionArg, {rejectWithValue}) => {
        try {
            const { categoryId, amount, difficulty } = arg;
            const params = new URLSearchParams({
                amount: amount.toString(),
                category: categoryId.toString(),
                difficulty,
                type: 'multiple',
            });
            const response = await fetch(
                `https://opentdb.com/api.php?${params.toString()}`
            );
            return await response.json();
        } catch (error) {
            console.log(error)
            return rejectWithValue("Couldn't fetch questions, please try again later");
        }
    }
);

const initialApiOptions: ApiOptions = {
    difficulty: 'easy',
    amount: 10,
    category: { id: null, name: null, src: null },
};

const initialState: QuestionState = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    wrongAnswers: [],
    results: {
        correctAnswers: 0,
        total: 0,
        difficulty: '',
        category: { id: 0, name: '', src: '' },
    },
    loading: false,
    ApiOptions: initialApiOptions,
    error: null,
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setDifficulty: (state, action) => {
            state.ApiOptions.difficulty = action.payload;
        },
        setAmount: (state, action) => {
            state.ApiOptions.amount = action.payload;
        },
        setCategory: (state, action) => {
            state.ApiOptions.category = action.payload;
        },
        goToNextQuestion: (state, action) => {
            state.answers.push(action.payload);
            state.currentQuestionIndex++;
        },
        calculateResults: (state, action) => {
            state.answers.push(action.payload);
            state.results.correctAnswers = 0;
            state.results.category = state.ApiOptions.category;
            state.results.difficulty = state.ApiOptions.difficulty;
            state.results.total = state.questions.length;
            const { questions, answers } = state;
            answers.forEach((answer, index) => {
                if (answer === questions[index].correct_answer) {
                    state.results.correctAnswers++;
                }
            });
        },
        clearStore: (state) => {
            state.questions = [];
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.wrongAnswers = [];
            state.results = {
                correctAnswers: 0,
                total: 0,
                difficulty: '',
                category: { id: 0, name: '', src: '' },
            };
            state.loading = false;
            state.ApiOptions = initialApiOptions;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.error = null;
                state.questions.push(...action.payload.results);
                state.loading = false;
            })
            .addCase(fetchQuestions.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setDifficulty, setAmount, setCategory, goToNextQuestion, calculateResults, clearStore } =
    questionSlice.actions;

export default questionSlice.reducer;
