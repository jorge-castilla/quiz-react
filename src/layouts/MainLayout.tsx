import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header className="flex justify-center items-center  z-20 h-14 text-2xl bg-slate-800 fixed w-screen top-0 font-black text-slate-50">
                Quizzy
            </header>
            <main className="min-h-[100vh] flex justify-center items-center max-w-xl mx-auto p-4 relative bg-slate-950 text-slate-50">
                <Outlet />
            </main>
        </>
    );
};
export default Layout;
