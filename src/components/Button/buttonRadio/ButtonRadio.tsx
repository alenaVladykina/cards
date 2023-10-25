import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './ButtonRadio.module.css'


export type DetailedHTMLPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type EditableSpanPropsType = DetailedHTMLPropsType & {
  // onChangeText?: (value: string | ReadonlyArray<string> | number | undefined) => void
  label?: string
  id: string
  // checked?: boolean

}

export const ButtonRadio: React.FC<EditableSpanPropsType> = React.memo(({
                                                                          id,
                                                                          label,
                                                                          value,
                                                                          name,
                                                                          checked,
                                                                          disabled,
                                                                          onChange,
                                                                          className,
                                                                          ...rest
                                                                        }) => {


  return (
    <div className={s.wrapper}>
      <input type={'radio'}
             name={name}
             id={id}
             value={value}
             className={s.input}
             checked={checked}
             onChange={onChange}
             {...rest}

      />
      <label htmlFor={id} className={s.label}>{label}</label>
    </div>
  );
})

