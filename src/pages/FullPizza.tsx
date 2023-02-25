import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { indexUrl } from '../App';
import { PizzaBlock, TPizzaBlockProps } from '../components/PizzaBlock';

const FullPizza: React.FunctionComponent = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<TPizzaBlockProps>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63dcc767367aa5a7a401c039.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.warn(error);
        alert('Ошибка при получении данных пиццы');
        navigate(indexUrl);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h3>Загрузка пиццы...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pizza-block">
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.title}</h2>
        {/* <h4>{pizza.price} ₽</h4> */}

        <PizzaBlock {...pizza} key={pizza.id} fullLoad={false} />

        <div className="cart__bottom-buttons">
          <Link to={indexUrl} className="button button--outline button--add go-back-btn">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
