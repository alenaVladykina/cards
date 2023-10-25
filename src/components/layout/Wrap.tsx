import React, {ReactNode} from 'react';
import s from './Wrap.module.css'

type WrapperType = {
  children?: ReactNode
}
export const Wrapper = (props: WrapperType) => {
  return (
    <div className={s.wrap}>
      <div className={s.wrapInside}>
        {props.children}
      </div>
    </div>
  );
};


export const WrapperPack = (props: WrapperType) => {
  return (
    <div className={s.wrapperPack}>
      {props.children}
    </div>
  );
};
