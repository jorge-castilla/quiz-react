interface DifficultyButtonProps {
  name: string;
  colorClass: string;
  colorClassSelected: string;
  isSelected: boolean;
  onClick: () => void;
}
const DifficultyButton = ({
  name,
  colorClass,
  colorClassSelected,
  isSelected,
  onClick,
}: DifficultyButtonProps) => {
  return (
    <button
      className={`text-center h-16 px-4 rounded-md border-2 transition duration-100 text-lg ${
        isSelected ? colorClassSelected : colorClass
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default DifficultyButton;
