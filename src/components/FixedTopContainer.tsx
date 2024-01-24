const FixedTopContainer = ({ children }) => {
    return (
        <div className="p-4 fixed top-14 z-20 bg-slate-950 w-full max-w-xl">
            {children}
        </div>
    );
};

export default FixedTopContainer;
