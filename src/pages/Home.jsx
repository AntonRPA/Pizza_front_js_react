import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//useSelector - вытаскивает данные из хранилища (похож на слушатель еще)
//useDispatch - выполняет команд (actions)

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setActivCategory } from '../redux/slices/filterSlice'; //Slice actions for redux toolkit

function Home() {
  /*Redux Toolkit */
  //Get state and dispatch
  const { categoryId: activCategory, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  /*Redux Toolkit */

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  //Смена активной категории
  const onClickCategory = (i) => {
    dispatch(setActivCategory(i));
    console.log('Select category: ' + i);
  };

  //Get json массив объектов (пицц)
  useEffect(() => {
    setIsLoading(true); //Включения скелетона

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = activCategory > 0 ? `&category=${activCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://63dcc767367aa5a7a401c039.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получение items');
      });

    window.scrollTo(0, 0); //скролл вверх при первом переходе на страницу главную
  }, [activCategory, sort, searchValue, currentPage]);

  // Фильтрация пицц на фронте
  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activCategory={activCategory} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
