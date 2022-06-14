import React, { useState, KeyboardEvent } from "react";

interface defaultHTMLInputAttr {
  value: number;
  max?: number;
  min?: number;
  maxLength?: number;
  // minLength?: number;
  placeholder?: string;
}

export interface NumericalInputProps extends defaultHTMLInputAttr{
  validationReg?: RegExp;
  validationHint?: string;
  removeRuleReg?: string;
  step?: number;
  hasStepArrow?: boolean;
  id?: string;
  onChange: (value: string) => any
}

export default function useNumericalInput({value, max, min, maxLength, validationReg, placeholder, id, onChange}: NumericalInputProps){
  // const compId = id?? `numerical-input-${Math.floor(Math.random()*99)}`;
  const [inputValue, setInputValue] = useState<string>(`${value}`);

  // let inputValue = '';
  // const setInputValue = (value: string)=>{
  //   inputValue = value;
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e?.target?.value ?? '';
    if(!value.match(/^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/)){
    // if(!value.match(/[\+\-]?([0-9]*[\.])?[0-9]+/)){
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

  const handleKeyup = (e: KeyboardEvent<HTMLElement>)=>{
    const keyUpValue = e.key;
    if(!keyUpValue.match(/[0-9\.\+\-]/)){
      console.log('KeyUP REG FAILED')
      setInputValue('');
      return
    }
  }

  return(
    <label htmlFor={id} className="numerical-input-wrapper">
      <input
        type="text"
        value={inputValue}
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyUp={handleKeyup}
        className="numerical-input"
        maxLength={maxLength}
        pattern="\d*"
      />
    </label>
  )
}