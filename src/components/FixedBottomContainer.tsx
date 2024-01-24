const FixedBottomContainer = ({ children }) => {
    return (
        <div className="fixed bottom-0 p-4 bg-slate-950 w-full flex max-w-xl inset-x-0 mx-auto z-20">
            {children}
        </div>
    );
};

export default FixedBottomContainer;
