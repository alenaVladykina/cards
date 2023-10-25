import React from 'react';
import s from "../auth.module.css";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useNavigate} from "react-router-dom";
import {GeneralForm} from "../generalFormComponent/GeneralForm";
import {Button} from "../../../components/Button/Button";
import {authThunk} from "../authReduser";
import {ValueType} from "../authTypes";
import {Wrapper} from "../../../components/layout/Wrap";


export const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoginIn)

  const navigate = useNavigate()

  const onClickNavigate = () => {
    navigate("/auth")
  }
  //
  // if (isLoggedIn) {
  //   navigate("/")
  // }

  const onSubmit = (value: ValueType) => {
    const newValues =
      {
        email: value.email ? value.email : '',
        password: value.password ? value.password : '',
      }
    dispatch(authThunk.register(newValues))
  }

  return (
    <Wrapper>
      <h1 className={s.title}>Sign Up</h1>
      <GeneralForm
        email={true}
        password={true}
        repeatPassword={true}
        onSubmit={onSubmit}
        inputStyle={s.input}
      >
        <Button
          type="submit"
          className={s.button}
          title={'Sing in'}/>
        <p className={s.subtitleBold}>Already have an account?</p>
        <Button
          type="button"
          className={s.buttonLink}
          title={'Sing In'}
          onClick={onClickNavigate}
        />
      </GeneralForm>
    </Wrapper>
  );
};

