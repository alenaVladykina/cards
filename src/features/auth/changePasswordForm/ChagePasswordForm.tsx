import React, {useCallback} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import s from "../auth.module.css";
import {authThunk} from "../authReduser";
import {useAppDispatch} from "../../../app/store";
import {ArgChangePassword, ValueType} from "../authTypes";
import {GeneralForm} from "../generalFormComponent/GeneralForm";
import {Button} from "../../../components/Button/Button";
import {Wrapper} from "../../../components/layout/Wrap";


export const ChangePasswordForm = () => {
  const {token} = useParams<string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = useCallback((value: ValueType) => {
    if (!token) {
      return;
    }

    const newValue: ArgChangePassword = {
      password: value.password ? value.password : '',
      resetPasswordToken: token

    }
    dispatch(authThunk.changePassword(newValue))
  }, [token])

  return (
    <Wrapper>
      <h1 className={s.title}>Create new password</h1>
      <GeneralForm password={true}
                   buttonSubmit={true}
                   onSubmit={onSubmit}
                   inputStyle={s.footerInput}
                   buttonSubmitStyle={s.button}
                   buttonSubmitTitle={'Send Instructions'}
      >
        <p className={s.subtitle}>Create new password and we will send you further instructions to email</p>
      </GeneralForm>
      <Button
        type="button"
        className={s.buttonLink}
        title={'Try logging in'}
        onClick={() => navigate('/')}
      />
    </Wrapper>
  );
};
