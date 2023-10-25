import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './searchPanel.module.css'


type DetailedHTMLPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SearchPanelType = DetailedHTMLPropsType & {
  label: string
  onChangeText: (value: string) => void
}
export const SearchPanel: React.FC<SearchPanelType> = React.memo(({
                                                                    id,
                                                                    name,
                                                                    value,
                                                                    placeholder,
                                                                    className,
                                                                    label,
                                                                    onChangeText
                                                                  }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeText(e.target.value)
    }

    return (
      <label htmlFor={name} className={s.label}>{label}
        <input type={'text'}
               id={name}
               name={name}
               value={value}
               onChange={(e) => handleChange(e)}
               placeholder={placeholder}
               className={s.searchInput}
        />
      </label>
    );
  }
)
