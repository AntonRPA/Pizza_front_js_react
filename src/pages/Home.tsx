import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//useSelector - вытаскивает данные из хранилища (похож на слушатель еще)
//useDispatch - выполняет команд (actions)
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
  selectFilter,
  setActivCategory,
  setCurrentPage,
  setFilter,
} from '../redux/slices/filterSlice'; //Slice actions for redux toolkit
import { sortList } from '../components/Sort';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
  /*Redux Toolkit */
  //Get state and dispatch
  const { categoryId: activCategory, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useDispatch();
  /*Redux Toolkit */

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  //Смена активной категории
  const onClickCategory = (idx: number) => {
    dispatch(setActivCategory(idx));
  };

  //Смена страницы (Пагинация)
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    // setIsLoading(true); //Включения скелетона

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = activCategory > 0 ? `&category=${activCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    //Get запрос на получение пицц от бэкенда
    dispatch(
      // @ts-ignore
      fetchPizzas({ sortBy, order, category, search, currentPage }),
    );
  };

  //Если изменили параметры и был первый рендер
  //Отображение параметров адресной строки после изменения фильтрации страницы
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: activCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activCategory, sort, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохранем в редаксе
  //Загрузка страницы с учетом фильтрации, распаршенной из адресной строки
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilter({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  //Get json массив объектов (пицц)
  useEffect(() => {
    window.scrollTo(0, 0); //скролл вверх при первом переходе на страницу главную

    if (isSearch.current === false) {
      getPizzas();
    }

    isSearch.current = false;
  }, [activCategory, sort, searchValue, currentPage]);

  // Фильтрация пицц на фронте
  // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activCategory={activCategory} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
          </div>
        ) : status === 'not_found' ? (
          <div className="content__error-info">
            <h2>Пицц не найдено 😕</h2>
            <p>К сожалению, не удалось найти пиццы. Попробуйте другой запрос</p>
          </div>
        ) : status === 'loading' ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : (
          pizzas
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
