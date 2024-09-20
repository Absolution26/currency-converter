import "./App.scss";
import React, { useEffect, useState } from "react";
import { Header } from "./components/header/Header";
import { Currencies } from "./types/currencies";
import { Currencies as CurrencyList } from "./components/currencies/currencies";

const intitialCurrency = {
  UAH: {
    UAH: 1,
    USD: 0.0241,
    EUR: 0.0216,
  },
  USD: {
    UAH: 41.4641,
    USD: 1,
    EUR: 0.8969,
  },
  EUR: {
    UAH: 46.3087,
    USD: 1.1149,
    EUR: 1,
  },
};

function App() {
  const [currency, setCurrency] = useState<Currencies>(intitialCurrency);
  const [currencyFrom, setCurrencyFrom] = useState("UAH");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [valueFrom, setValueFrom] = useState<number | ''>(
    currency[currencyFrom][currencyFrom]
  );
  const [valueTo, setValueTo] = useState<number | ''>(currency[currencyTo][currencyFrom]);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/e4fb1ec409ba8371810428d9/latest/UAH"
    )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
      .then((data) => {
        setCurrency((prevCurrency) => ({
          ...prevCurrency,
          UAH: {
            UAH: 1,
            USD: data.conversion_rates.USD,
            EUR: data.conversion_rates.EUR,
          },
        }));
      });

  fetch(
    "https://v6.exchangerate-api.com/v6/e4fb1ec409ba8371810428d9/latest/USD"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((data) => {
      setCurrency((prevCurrency) => ({
        ...prevCurrency,
        USD: {
          USD: 1,
          UAH: data.conversion_rates.UAH,
          EUR: data.conversion_rates.EUR,
        },
      }));
    });

  fetch(
    "https://v6.exchangerate-api.com/v6/e4fb1ec409ba8371810428d9/latest/EUR"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((data) => {
      setCurrency((prevCurrency) => ({
        ...prevCurrency,
        EUR: {
          UAH: data.conversion_rates.UAH,
          USD: data.conversion_rates.USD,
          EUR: 1,
        },
      }));
    });
  }, []);

  useEffect(() => {
    setValueFrom(currency[currencyFrom][currencyFrom]);
    setValueTo(currency[currencyTo][currencyFrom]);
  }, [currencyFrom, currency, currencyTo]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === "currencyFrom") {
      if (valueFrom !== '') {
        setCurrencyFrom(event.target.value);
        setValueTo(
        () => +(valueFrom * currency[event.target.value][currencyTo]).toFixed(3)
      );
      }
      
    }

    if (event.target.name === "currencyTo") {
      if (valueTo !== '') {
        setCurrencyTo(event.target.value);
        setValueFrom(
          () => +(valueTo * currency[event.target.value][currencyFrom]).toFixed(3)
        );
      }
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (arg: number | "") => void
  ) => {
    const regExp = /^[\d.]*$/gm;
  
    if (event.target.value === "") {
      callback("");
    } else if (regExp.test(event.target.value)) {
      callback(+event.target.value);
    }
  
    if (event.target.name === "inputFrom") {
      setValueTo(() => {
        return event.target.value === ""
          ? ""
          : +event.target.value * currency[currencyTo][currencyFrom];
      });
    }
  
    if (event.target.name === "inputTo") {
      setValueFrom(() => {
        return event.target.value === ""
          ? ""
          : +event.target.value * currency[currencyTo][currencyFrom];
      });
    }
  };

  return (
    <div className="App">
      <Header currency={currency} />

      <div className="container">
        <CurrencyList
          valueFrom={valueFrom}
          valueTo={valueTo}
          currencyFrom={currencyFrom}
          currencyTo={currencyTo}
          setValueFrom={setValueFrom}
          setValueTo={setValueTo}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
}

export default App;
