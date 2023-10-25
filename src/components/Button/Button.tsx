import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';

type ButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


export const Button: React.FC<ButtonType> = React.memo(({
                                                          type,
                                                          title,
                                                          onClick,
                                                          className,
                                                          value,
                                                          ...restProps
                                                        }) => {


  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        {...restProps}
      >
        {title}
      </button>
    </>
  );
})
