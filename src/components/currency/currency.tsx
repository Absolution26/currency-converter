import { useState } from "react";

interface Props {
  value: number | '';
  activeCurrency: string;
  range: string;
  setValue: React.Dispatch<React.SetStateAction<number | ''>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number | ''>>
  ) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Currency: React.FC<Props> = ({
  value,
  activeCurrency,
  range,
  setValue,
  handleInputChange,
  handleSelectChange,
}) => {
  const [icon, setIcon] = useState(activeCurrency);

  return (
    <div className="currency">
      <input
        type="number"
        name={`input${range}`}
        className="currency__input"
        value={value}
        onChange={(event) => handleInputChange(event, setValue)}
      />

      {icon === "UAH" && <i className="fa-solid fa-hryvnia-sign"></i>}
      {icon === "USD" && <i className="fa-solid fa-dollar-sign"></i>}
      {icon === "EUR" && <i className="fa-solid fa-euro-sign"></i>}
    
      <select
        name={`currency${range}`}
        className="currency__select"
        defaultValue={activeCurrency}
        onChange={(event) => {
          setIcon(event.target.value);
          handleSelectChange(event);
        }}
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
