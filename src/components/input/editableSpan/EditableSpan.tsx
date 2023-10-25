import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEventHandler} from 'react';
import s from './EditableSpan.module.css'


type DetailedHTMLPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type EditableSpanPropsType = DetailedHTMLPropsType & {
  onChangeText?: (value: string) => void
  label?: string
  icon?: string
  value?: string | null | undefined
  //onDoubleClick?: () => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({
                                                                           onBlur,
                                                                           icon,
                                                                           label,
                                                                           value,
                                                                           placeholder,
                                                                           name,
                                                                           onChangeText,
                                                                           type,
                                                                           disabled,
                                                                           onFocus,
                                                                           className,
                                                                           onDoubleClick,
                                                                           onKeyPress,
                                                                           ...rest
                                                                         }) => {


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value)
  }
  const onKeyPressHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onKeyPress && onKeyPress(e)
    }
  }
  const onBlurHandler = (e: any) => {
    onBlur && onBlur(e)
  }
  const onDoubleClickHandler = (e: any) => {
    onDoubleClick && onDoubleClick(e)
  }

  const onFocusHandler = (e: any) => {
    onFocus && onFocus(e)
  }

  return (
    <label htmlFor={name} className={s.label}>{label}
      <input type={type}

             id={name}
             onBlur={onBlurHandler}
             name={name}
             onKeyPress={onKeyPressHandler}
             value={value}
             onFocus={onFocusHandler}
             disabled={disabled}
             onChange={onChangeHandler}
             placeholder={placeholder}
             className={className}
             onDoubleClick={onDoubleClickHandler}
             autoFocus
             {...rest}
      />
    </label>
  );
})



