function Categories({ activCategory, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
