import React, { useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null); //useRef - используется для взаимодействия с DOM элементами
  const dispatch = useDispatch();

  //Очистка поискового input
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus(); //"?" означает - Если есть current, то выполни focus
  };

  /***Отложенный поиск(get запрос к бэкэнду) с паузой, после ввода слова */
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  /***Отложенный поиск(get запрос к бэкэнду) с паузой, после ввода слова */

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 512 512"
        height="512px"
        id="search"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <g id="search_1_">
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="SVGID_1_"
            x1="57.9473"
            x2="407.9511"
            y1="351.4531"
            y2="149.3783">
            <stop offset="0" style={{ color: '#F14D5C' }} />
            <stop offset="0.1309" style={{ color: '#F05454' }} />
            <stop offset="0.3346" style={{ color: '#ED663E' }} />
            <stop offset="0.3492" style={{ color: '#ED683C' }} />
            <stop offset="0.714" style={{ color: '#F3903F' }} />
            <stop offset="1" style={{ color: '#FDC70C' }} />
          </linearGradient>
          <path
            d="M300.766,87.509c-33.056,0-64.133,12.873-87.507,36.246c-23.374,23.374-36.247,54.451-36.247,87.507   c0,24.234,6.927,47.4,19.83,67.252l-12.669,12.669c0,0.001-0.001,0.001-0.001,0.001l-90.664,90.665   c-8.353,8.354-7.88,22.418,1.055,31.353l4.261,4.262c4.669,4.668,10.736,7.028,16.658,7.028c5.417,0,10.713-1.976,14.703-5.966   l15.405-15.405l75.259-75.259l12.671-12.672c19.85,12.9,43.014,19.826,67.246,19.826c33.056,0,64.133-12.873,87.506-36.247   c48.252-48.251,48.252-126.762,0-175.014C364.898,100.382,333.821,87.509,300.766,87.509z M138.518,396.049   c-4.454,4.453-12.178,3.979-17.219-1.063l-4.261-4.262c-5.036-5.035-5.509-12.756-1.055-17.21l71.38-71.38   c3.284,4.164,6.834,8.16,10.601,11.926c3.766,3.766,7.764,7.318,11.935,10.607L138.518,396.049z M105.894,410.391l-4.261-4.26   c-5.036-5.036-5.509-12.757-1.055-17.211l2.902-2.902c0.936,4.27,3.101,8.393,6.486,11.779l4.261,4.26   c3.392,3.393,7.523,5.549,11.799,6.483l-2.914,2.914C118.658,415.908,110.934,415.432,105.894,410.391z M213.788,320.779   c0.002-0.003,0.005-0.006,0.007-0.008l0,0L213.788,320.779z M217.033,317.534c-4.201-3.248-8.229-6.775-11.998-10.544   c-3.771-3.771-7.295-7.797-10.537-11.99l8.214-8.214c3.233,4.181,6.749,8.185,10.547,11.982c3.8,3.8,7.806,7.317,11.989,10.552   L217.033,317.534z M381.201,291.697c-21.485,21.485-50.052,33.318-80.436,33.318c-30.385,0-58.951-11.833-80.436-33.318   c-21.485-21.484-33.318-50.051-33.318-80.436s11.833-58.95,33.318-80.436c21.485-21.485,50.051-33.317,80.436-33.317   c30.384,0,58.95,11.832,80.436,33.317C425.553,175.179,425.553,247.346,381.201,291.697z"
            fill="url(#SVGID_1_)"
          />
          <path
            d="M258.117,115.27l3.604,9.328c2.592-1.001,5.267-1.887,7.949-2.632l-2.676-9.636   C263.998,113.162,261.012,114.151,258.117,115.27z"
            fill="#F4943B"
          />
          <path
            d="M206.264,162.886l8.985,4.389c8.299-16.992,22.191-30.997,39.118-39.433l-4.46-8.95   C231.022,128.304,215.523,143.928,206.264,162.886z"
            fill="#F1853E"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
