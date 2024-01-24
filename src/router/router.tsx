import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/MainLayout.tsx';
import Index from '@/pages/Index.tsx';
import Preferences from '@/pages/Preferences.tsx';
import Question from '@/pages/Question.tsx';
import Results from '@/pages/Results.tsx';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<Index />}
                    />
                    <Route
                        path="preferences"
                        element={<Preferences />}
                    />
                    <Route
                        path="question"
                        element={<Question />}
                    />
                    <Route
                        path="results"
                        element={<Results />}
                    />
                    {/* otras rutas aquí */}
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
