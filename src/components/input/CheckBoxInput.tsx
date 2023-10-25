import React, {ChangeEvent, useState} from 'react';
import s from "./input.module.css";


type CheckBoxInputPropsType = {
  handlePrivate: (value: boolean) => void
  title: string
  privateValue: boolean
}


export const CheckBoxInput: React.FC<CheckBoxInputPropsType> = ({
                                                                  handlePrivate,
                                                                  title,
                                                                  privateValue
                                                                }) => {

  const [value, setValue] = useState(privateValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePrivate(e.target.checked)
    setValue(!value)
  }

  return (
    <div className={s.checkboxWrap}>
      <input
        type={'checkbox'}
        checked={value}
        className={s.checkbox}
        onChange={handleChange}/>
      <p className={s.titleCheckbox}>{title}</p>
    </div>
  );
};

