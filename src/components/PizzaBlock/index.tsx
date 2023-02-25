import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../redux/cart/slice';
import { TCartItem } from '../../redux/cart/types';
import { selectorCartById } from '../../redux/cart/selectors';

import { useAppDispatch } from '../../redux/store';

const typesName = ['тонкое', 'традиционное'];

//Типизация props
export type TPizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
  fullLoad?: boolean; //Полностью загружать компонент, или частично
};

export const PizzaBlock: React.FC<TPizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
  fullLoad = true,
}) => {
  const [pizzaType, setPizzaType] = useState<number>(0);
  const [pizzaSize, setPizzaSize] = useState<number>(0);
  const dispatch = useAppDispatch();

  //Получаем количество пицц добавленных в корзину
  const addPizza = useSelector(selectorCartById(id));
  const addPizzaCount = addPizza ? addPizza.count : '';

  //При клике "Добавить", добавлем объект-пиццу в reducer "cart"
  const onAddClick = () => {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesName[pizzaType],
      size: sizes[pizzaSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        {/* Передаем id для загрузски страницы FullPizza.jsx */}
        {fullLoad && (
          <Link to={`/pizza/${id}`}>
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{title}</h4>
          </Link>
        )}

        <div className="pizza-block__selector">
          {/* Тип теста */}
          <ul>
            {types.map((typeId, index) => (
              <li
                key={typeId}
                onClick={() => setPizzaType(index)}
                className={index === pizzaType ? 'active' : ''}>
                {typesName[typeId]}
              </li>
            ))}
          </ul>

          {/* Размеры пиццы */}
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setPizzaSize(index)}
                className={index === pizzaSize ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} ₽</div>
          <button onClick={() => onAddClick()} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addPizzaCount > 0 ? <i>{addPizzaCount}</i> : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
