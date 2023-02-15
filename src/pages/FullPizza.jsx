import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { indexUrl } from '../App';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
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
        <h3>Загрузка...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;
