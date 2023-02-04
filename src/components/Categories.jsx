import { useState } from 'react';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activCategory, setActivCategory] = useState(0);

  //Смена активной категории
  const onClickCategory = (i) => {
    setActivCategory(i);
    console.log('Select category: ' + i);
  };

  return (
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
}

export default Categories;
