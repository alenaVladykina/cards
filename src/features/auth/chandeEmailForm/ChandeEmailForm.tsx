import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Button} from "../../../components/Button/Button";
import s from "../auth.module.css";
import {authThunk} from "../authReduser";
import {ValueType} from "../authTypes";
import {GeneralForm} from "../generalFormComponent/GeneralForm";
import {useNavigate} from "react-router-dom";
import {Wrapper} from "../../../components/layout/Wrap";


export const ChangeEmailForm = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const message = useAppSelector(state => state.app.payloadMessage)
  const onSubmit = useCallback((value: ValueType) => {
    dispatch(authThunk.forgot(value.email ? value.email : ''))
  }, [])

  if (message) {
    navigate('/set-new-password/')
  }


  const onNavigate = () => {
    navigate('/')
  }
  return (
    <Wrapper>
      <h1 className={s.title}>Forgot your password?</h1>
      <GeneralForm
        inputStyle={s.input}
        email={true}
        onSubmit={onSubmit}
      >
        <p className={s.subtitle}>Enter your email address and we will send you further instructions</p>
        <Button
          type="submit"
          className={s.button}
          title={'Send Instructions'}
        />
        <Button
          type="button"
          className={s.buttonLink}
          title={'Try logging in'}
          onClick={onNavigate}
        />
      </GeneralForm>
    </Wrapper>

  )
};

