import { useNavigate } from "react-router-dom";

const list = [
  { emoji: "🎯", text: "Quick and entertaining quizzes" },
  { emoji: "😜", text: "Topics for every taste" },
  { emoji: "🧠", text: "Learn something new every day" },
];

const Index = () => {
  const navigate = useNavigate();

  const redirectToPreferences = () => {
    navigate("/preferences");
  };

  return (
    <div className="px-8 max-w-xl">
      <p className="text-center">Welcome to</p>
      <h1 className="text-4xl font-black mb-8 text-center">Quizzy</h1>
      <p className="text-justify mb-4 text-slate-400">
        Explore a world of trivia. Laugh, learn, and grow with every question.
        Simple, fast, and always interesting: that's Quizzy. Get ready to dive
        into fascinating topics and compete with friends.
        <span className="font-bold"> Ready for the challenge?</span>
      </p>
      <ul className="mb-8 mx-4">
        {list.map(({ emoji, text }) => (
          <li key={text} className="flex mb-1 text-slate-300">
            <div className="w-8">{emoji}</div>
            {text}
          </li>
        ))}
      </ul>
      <p className="text-slate-400 text-center text-lg mb-6 font-semibold">
        Start playing now and challenge your mind!
      </p>
      <div className="flex justify-center">
        <button
          className="bg-teal-500 w-1/3 text-slate-800 px-6 py-3 rounded-lg hover:bg-teal-400"
          onClick={redirectToPreferences}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Index;