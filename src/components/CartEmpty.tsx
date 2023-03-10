import React from 'react';
import { Link } from 'react-router-dom';
import { indexUrl } from '../App';
import emptyCartImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div className="content">
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to={indexUrl} className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  </div>
);
