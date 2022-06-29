import React, { useState, useEffect } from "react";

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
  minWarningHint?: string;
  step?: number;
  hideStepArrow?: boolean;
  id?: string;
  onChange: (value: string) => any;
  onInvalid?: (value: boolean) => any | React.Dispatch<React.SetStateAction<boolean>>;
}
let timer: ReturnType<typeof setTimeout>| null = null;

export default function useNumericalInput({
  value,
  max,
  min,
  validationReg,
  placeholder,
  step=1,
  maxWarningHint,
  minWarningHint,
  id,
  onChange,
  onInvalid}: NumericalInputProps){

  const [inputValue, setInputValue] = useState<string>(`${value}`);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);
  const [showMinWarning, setShowMinWarning] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e?.target?.value ?? '';
    const parsedFloat = parseFloat(value);

    // console.log(`parsedFloat: ${parsedFloat}; isNaN: ${isNaN(parsedFloat)}; ${(typeof min !== 'undefined' && parsedFloat<min)}` );
    if(!value.match(/^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/)){
      console.log('float reg failed: ', value)
      setInputValue('');
      onChange('');
      return
    }

    if(validationReg && !value.match(validationReg)){
      setInputValue('');
      onChange('');
      return
    }

    if(max && parsedFloat>max){
      setInputValue(`${max}`);
      setShowMaxWarning(true);
      onChange(`${max}`);
      return
    }else {
      setShowMaxWarning(false);
    }

    if((typeof min !== 'undefined' && parsedFloat<min) || isNaN(parsedFloat)){
      console.log('min excced',  parseFloat(value))
      setInputValue(`${min}`);
      setShowMinWarning(true);
      onChange(`${min}`);
      return
    }else {
      setShowMinWarning(false);
    }
    setInputValue(value);
    onChange(value);
  }

  useEffect(()=>{
    if(onInvalid){
      onInvalid((showMaxWarning && showMinWarning));
    }
  }, [showMaxWarning, showMinWarning, onInvalid])

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
      {showMaxWarning && maxWarningHint?
        <div className="warning-hint-container">
          {maxWarningHint}
        </div>
      :null}
      {showMinWarning && minWarningHint?
        <div className="warning-hint-container">
          {minWarningHint}
        </div>
      :null}
    </label>
  )
}