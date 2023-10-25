import React, {useCallback, useEffect} from 'react';
import s from '../auth.module.css'
import {authThunk} from "../authReduser";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useNavigate} from "react-router-dom";
import {GeneralForm} from "../generalFormComponent/GeneralForm";
import {ValueType} from "../authTypes";
import {Wrapper} from "../../../components/layout/Wrap";
import {getAuth} from "../../../commons/selectors";


export const AuthorisationForm = () => {

  const isLoggedIn = useAppSelector(getAuth).isLoginIn
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/packs`)
    }
  }, [isLoggedIn])


  const onClickHandlerNavigate = useCallback(() => {
    navigate('/request-password')
  }, [])

  const onSubmit = (value: ValueType) => {
    dispatch(authThunk.login({
      email: value.email ? value.email : '',
      password: value.password ? value.password : '',
      rememberMe: value.rememberMe ? value.rememberMe : false
    }))
  }


  return (
    <Wrapper>
      <h1 className={s.title}>Sign In</h1>
      <GeneralForm
        email={true}
        password={true}
        checkBox={true}
        inputStyle={s.input}
        onSubmit={onSubmit}
        onClickHandlerNavigate={onClickHandlerNavigate}
        buttonSubtitle={true}
        buttonSubmit={true}
        buttonSubmitStyle={s.button}
        buttonSubmitTitle={'Sing in'}
        buttonLink={true}
        buttonLinkHandler={() => navigate('/registration')}
      >
        <p className={s.subtitleBold}>Don't have an account?</p>
      </GeneralForm>
    </Wrapper>
  );
}
