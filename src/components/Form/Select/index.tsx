import { ChangeEvent } from "react";
import "../form.global.css";
import { OptionSelect } from "../../types";

function Select({ name, id, options, onChangeEvent }: PropsSelect) {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeEvent?.(parseInt(event.target.value));
  }
  return (
      <select name={name} id={id} onChange={handleSelectChange}>
        {options?.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.description}
          </option>
        ))}
      </select>
  );
}

type PropsSelect = {
  name: string;
  id: string;
  options?: OptionSelect[];
  onChangeEvent?: (id: number) => void;
};

export default Select;
