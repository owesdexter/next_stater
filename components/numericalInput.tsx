import React, { useState, UIEvent } from "react";

interface defaultHTMLInputAttr {
  value: number;
  max?: number;
  min?: number;
  placeholder?: string;
}

export interface NumericalInputProps extends defaultHTMLInputAttr{
  validationReg?: RegExp;
  validationHint?: string;
  removeRuleReg?: string;
  step?: number;
  hideStepArrow?: boolean;
  id?: string;
  onChange: (value: string) => any
}
let timer: ReturnType<typeof setTimeout>| null = null;

export default function useNumericalInput({value, max, min, validationReg, placeholder, step=1, id, onChange}: NumericalInputProps){
  const [inputValue, setInputValue] = useState<string>(`${value}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e?.target?.value ?? '';
    if(!value.match(/^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/)){
      console.log('float reg failed')
      setInputValue('');
      onChange('');
      return
    }
    if(validationReg && !value.match(validationReg)){
      console.log('REG Failed validation')
      setInputValue('');
      onChange('');
      return
    }
    if(max && parseFloat(value)>max){
      console.log('Maximum is: ', max)
      setInputValue(`${max}`);
      onChange(`${max}`);
      return
    }
    if(min && parseFloat(value)<min){
      console.log('Minimum is: ', min)
      setInputValue(`${min}`);
      onChange(`${min}`);
      return
    }
    setInputValue(value);
    onChange(value);
  }

  return(
    <label htmlFor={id} className="numerical-input-wrapper">
      <input
        type="number"
        value={inputValue}
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="numerical-input"
        pattern="\d*"
      />
    </label>
  )
}