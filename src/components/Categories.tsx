import React from 'react';

type CategoriesProps = {
  activCategory: number;
  onClickCategory: (index: number) => void; //void - означает что у функции нет return. Она ничего не возвращает
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ activCategory, onClickCategory }) => (
  <div className="categories">
    <ul>
      {categories.map((cat, index) => {
        return (
          <li
            key={cat}
            onClick={() => onClickCategory(index)}
            className={activCategory === index ? 'active' : ''}>
            {cat}
          </li>
        );
      })}
    </ul>
  </div>
);

export default Categories;
