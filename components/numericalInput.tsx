import React, { useState } from "react";

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
  maxWarningHint?: string;
  step?: number;
  hideStepArrow?: boolean;
  id?: string;
  onChange: (value: string) => any
}
let timer: ReturnType<typeof setTimeout>| null = null;

export default function useNumericalInput({value, max, min, validationReg, placeholder, step=1, maxWarningHint, id, onChange}: NumericalInputProps){
  const [inputValue, setInputValue] = useState<string>(`${value}`);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e?.target?.value ?? '';
    if(!value.match(/^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/)){
      console.log('float reg failed')
      setInputValue('');
      onChange('');
      return
    }
    if(validationReg && !value.match(validationReg)){
      setInputValue('');
      onChange('');
      return
    }
    if(max && parseFloat(value)>max){
      setInputValue(`${max}`);
      setShowMaxWarning(true);
      onChange(`${max}`);
      return
    }else {
      setShowMaxWarning(false);
    }
    if(min && parseFloat(value)<min){
      setInputValue(`${min}`);
      onChange(`${min}`);
      return
    }
    setInputValue(value);
    onChange(value);
  }

  return(
    <label htmlFor={id} className={`numerical-input-wrapper ${showMaxWarning? 'warning': ''}`}>
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
      <span className="warning-hint-container">{maxWarningHint}</span>
    </label>
  )
}