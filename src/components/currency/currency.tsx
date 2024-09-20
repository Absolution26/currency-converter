interface Props {
  value: number;
  activeCurrency: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Currency: React.FC<Props> = ({
  value,
  activeCurrency,
  setValue,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="currency">
      <input
        type="number"
        name="inputFrom"
        className="currency__input"
        min="0"
        value={value}
        onChange={(event) => handleInputChange(event, setValue)}
      />

      {activeCurrency === "UAH" && <i className="fa-solid fa-hryvnia-sign"></i>}
      {activeCurrency === "USD" && <i className="fa-solid fa-dollar-sign"></i>}
      {activeCurrency === "EUR" && <i className="fa-solid fa-euro-sign"></i>}

      <select
        name="currencyFrom"
        className="currency__select"
        defaultValue="UAH"
        onChange={handleSelectChange}
      >
        <option value="UAH" className="currency__item">
          UAH
        </option>
        <option value="EUR" className="currency__item">
          EUR
        </option>
        <option value="USD" className="currency__item">
          USD
        </option>
      </select>
    </div>
  );
};
