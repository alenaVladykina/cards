import React, {useState} from 'react';
import {ButtonRadio} from "../../Button/buttonRadio/ButtonRadio";
import s from "./radioForm.module.css";

type RadioFrom = {
  filterPacks: (value: boolean) => void
}

export const RadioFrom: React.FC<RadioFrom> = ({filterPacks}) => {

  const [value, setValue] = useState<string>('0')

  const onFilterPacks = (e: any) => {
    const newValue = e.target.value === '1'
    filterPacks(newValue)
    setValue(e.target.value)
  }



  return (
    <div className={s.wrapButtons}>
      <div className={s.buttonLabel}><span>Show packs cards</span></div>
      <div className={s.buttonsContainer}>
        <ButtonRadio
          value={1}
          name={'radio'}
          id={'radio_1'}
          label={'My'}
          onClick={onFilterPacks}
          defaultChecked={value === '1'}
          className={s.button}
        />
        <ButtonRadio
          name={'radio'}
          id={'radio_2'}
          label={'All'}
          onClick={onFilterPacks}
          value={0}
          defaultChecked={value === '0'}
          className={s.button}
        />
      </div>
    </div>
  );
};