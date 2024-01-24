import { FC } from 'react';

interface Props {
  name: string | null;
  src: string | null;
  isSelected?: boolean | null;
  classes?: string | null;
}

const CategoryCard: FC<Props> = ({ name, src, isSelected, classes }) => {
  const style = {
    backgroundImage: `url(${src})`,
    // Aquí puedes agregar más estilos si lo necesitas
  };
  const overlayClasses = ` absolute inset-0 bg-stone-950 transition duration-100 ${
    isSelected ? 'bg-opacity-30 border rounded-xl' : 'bg-opacity-70'
  }`;
  return (
    <article
      style={style}
      className={`${classes} aspect-[16/9] bg-cover bg-center relative flex justify-center items-center rounded-xl cursor-pointer`}
    >
      <div className={overlayClasses}></div>
      <h2 className="sm:text-xl relative z-10 font-bold px-2 text-center">
        {name}
      </h2>
    </article>
  );
};

export default CategoryCard;
