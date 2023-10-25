import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react'
import s from './select.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
  options: string[]
  onChangeOption: (option: any) => void
  label?: string
}

export const Select: React.FC<SelectPropsType> = ({
                                                    options,
                                                    className,
                                                    onChange,
                                                    onChangeOption,
                                                    label,
                                                    name,
                                                    id,
                                                    ...restProps
                                                  }) => {
  const mappedOptions: any[] = options
    ? options.map((option, index) => (
      <option
        className={s.option}
        key={index}
        value={option}
      >
        {option}
      </option>
    ))
    : []


  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeOption(Number(e.target.value))
  }

  // const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <React.Fragment>
      <label className={s.labelSelect}
             htmlFor={id}>{label}</label>
      <select id={id}
              className={className}
              onChange={onChangeCallback}
              {...restProps}
      >
        {mappedOptions}
      </select>
    </React.Fragment>
  )
}