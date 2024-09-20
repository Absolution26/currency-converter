import React from "react";
import { Currencies } from "../../types/currencies";

interface Props {
  currency: Currencies,
}

export const Header: React.FC<Props> = ({ currency }) => {
  return (
    <div className="header">
      <div className="header__curr">{`USD: ${currency.USD.UAH}`}</div>
      <div className="header__curr">{`EUR: ${currency.EUR.UAH}`}</div>
    </div>
  );
};