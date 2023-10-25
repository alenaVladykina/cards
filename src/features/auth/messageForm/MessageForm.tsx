import React from 'react';
import s from "../auth.module.css";
import {Button} from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../app/store";
import {Wrapper} from "../../../components/layout/Wrap";
import {getAuth} from "../../../commons/selectors";


export const MessageForm = () => {
  const email = useAppSelector(getAuth).profile?.email
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/auth')
  }

  return (
    <div>
      <Wrapper>
        <h1 className={s.title}>Check Email</h1>
        <div className={s.imageWrapper}/>
        <p className={s.subtitle}>We’ve sent an Email with instructions to {email}</p>
        <Button
          type="button"
          className={s.button}
          title={'Back to logins'}
          onClick={onClickHandler}
        />
      </Wrapper>
    </div>
  );
};

