import React from 'react';
import s from './button.module.css'

type ButtonModalType = {
  title: string
  onClick: () => void
}
export const ButtonModal: React.FC<ButtonModalType> = ({title, onClick}) => {
  return (
    <button
      className={s.buttonModal}
      type={'button'}
      onClick={onClick}>
      {title}
    </button>
  );
};
