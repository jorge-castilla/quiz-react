export interface CategoryType {
  id: number | null;
  name: string | null;
  src: string | null;
}

export interface ApiOptions {
  difficulty: string;
  amount: number;
  category: CategoryType;
}

export interface ResultsType {
  correctAnswers: number;
  total: number;
  difficulty: string;
  category: CategoryType;
}

export interface QuestionState {
  questions: Array<any>;
  currentQuestionIndex: number;
  answers: string[];
  wrongAnswers: Array<any>;
  results: ResultsType;
  loading: boolean;
  ApiOptions: ApiOptions;
  error: string | null;
}
