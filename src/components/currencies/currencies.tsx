import { Currency } from "../currency/currency";

interface Props {
  valueFrom: number | '';
  valueTo: number | '';
  currencyFrom: string;
  currencyTo: string;
  setValueTo: React.Dispatch<React.SetStateAction<number | ''>>;
  setValueFrom: React.Dispatch<React.SetStateAction<number | ''>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number | ''>>
  ) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Currencies: React.FC<Props> = ({
  valueFrom,
  valueTo,
  currencyFrom,
  currencyTo,
  setValueFrom,
  setValueTo,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="currencies">
      <Currency
        value={valueFrom}
        activeCurrency={currencyFrom}
        range={'From'}
        setValue={setValueFrom}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />

      <Currency
        value={valueTo}
        activeCurrency={currencyTo}
        range={'To'}
        setValue={setValueTo}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};
