import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
//useSelector - вытаскивает данные из хранилища (похож на слушатель еще)
//useDispatch - выполняет команд (actions)
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setActivCategory, setCurrentPage, setFilter } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { IFilterSliceState } from '../redux/filter/types';

const Home: React.FC = () => {
  /*Redux Toolkit */
  //Get state and dispatch
  const { categoryId: activCategory, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  /*Redux Toolkit */

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  //Смена активной категории
  const onClickCategory = useCallback((idx: number) => {
    dispatch(setActivCategory(idx));
  }, []);

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
      fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }),
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
        searchValue: searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activCategory, sort, currentPage, searchValue]);

  //Если был первый рендер, то проверяем URL-параметры и сохранем в редаксе
  //Загрузка страницы с учетом фильтрации, распаршенной из адресной строки
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as IFilterSliceState;
      console.log(params);
      // @ts-ignore
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilter({
          categoryId: Number(params.categoryId), //Типизируем к
          searchValue: params.searchValue,
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
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
  const pagination = <Pagination currentPage={currentPage} onChangePage={onChangePage} />;

  return (
    <div className="container">
      <div className="content__top">
        <Categories activCategory={activCategory} onClickCategory={onClickCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
          </div>
        ) : status === 'not_found' ? (
          <>
            <div className="content__error-info">
              <h2>Пицц не найдено 😕</h2>
              <p>К сожалению, не удалось найти пиццы. Попробуйте другой запрос</p>
            </div>
            {pagination}
          </>
        ) : status === 'loading' ? (
          <div className="content__items">
            {[...new Array(6)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="content__items">{pizzas}</div>
            {pagination}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
