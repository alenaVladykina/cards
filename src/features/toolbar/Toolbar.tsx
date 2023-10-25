import React, {useState} from 'react';
import s from './toolbar.module.css';
import {RadioFrom} from "../../components/input/radioForm/RadioFrom";
import {SearchPanel} from "../../components/searchPanel/SearchPanel";
import {SuperRange} from "../../components/input/Range";


export type ToolbarPropsType = {
  userCard: string
  searchName: string
  onChangeEditTableSpan: (value: string) => void
  filterPacks: (value: boolean) => void
  filterMinMax: (value: number, value2: number) => void
}


export const Toolbar: React.FC<ToolbarPropsType> = React.memo(({
                                                                 searchName,
                                                                 onChangeEditTableSpan,
                                                                 filterPacks,
                                                                 filterMinMax
                                                               }) => {


  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(100)


  const handleChange = (event: any) => {
    setValue1(event.target.value[0])
    setValue2(event.target.value[1])
    filterMinMax(event.target.value[0], event.target.value[1])
  }

  return (
    <div>
      <div className={s.subtitle}>
        <div className={s.inputContainer}>
          <SearchPanel
            value={searchName}
            onChangeText={onChangeEditTableSpan}
            label={'Search'}
            placeholder={'Provide your text'}
          />
        </div>
        <RadioFrom filterPacks={filterPacks}/>
        <div className={s.inputRange}>
          <span className={s.spanBefore}>{value1}</span>
          <SuperRange
            step={5}
            defaultValue={0}
            id={'rangeInput'}
            min={0}
            max={100}
            value={[value1, value2]}
            onChange={handleChange}
          />
          <span className={s.spanAfter}>{value2}</span>
        </div>
      </div>
    </div>
  );
})
