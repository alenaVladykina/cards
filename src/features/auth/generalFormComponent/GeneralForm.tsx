import React, {ReactNode} from 'react';
import {useFormik} from "formik";
import s from "../auth.module.css";
import {FormikErrorType, ValueType} from "../authTypes";
import {Button} from "../../../components/Button/Button";
import {EditableSpan} from "../../../components/input/editableSpan/EditableSpan";


type GeneralFormType = {
  onSubmit: (value: ValueType) => void
  inputStyle?: string
  email?: boolean
  password?: boolean
  checkBox?: boolean
  onClickHandlerNavigate?: () => void
  children?: ReactNode
  buttonSubtitle?: boolean
  repeatPassword?: boolean
  buttonSubmit?: boolean
  buttonSubmitStyle?: string
  buttonSubmitTitle?: string
  buttonLink?: boolean
  buttonLinkStyle?: string
  buttonLinkHandler?: () => void
  buttonLinkTitle?: string
}

export const GeneralForm: React.FC<GeneralFormType> = React.memo(({
                                                                    email,
                                                                    password,
                                                                    inputStyle,
                                                                    onSubmit,
                                                                    repeatPassword,
                                                                    checkBox,
                                                                    buttonSubtitle,
                                                                    onClickHandlerNavigate,
                                                                    buttonSubmitStyle,
                                                                    buttonSubmitTitle,
                                                                    buttonLinkHandler,
                                                                    buttonLink,
                                                                    buttonSubmit,
                                                                    children
                                                                  }) => {


  const formik = useFormik({
    initialValues: {
      email: null as string | null,
      password: null as string | null,
      rememberMe: false,
      confirmPassword: null as string | null,
    },

    validate: values => {
      const errors: FormikErrorType = {};

      if (email) {
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email ? values.email : '')) {
          errors.email = 'Invalid email address';
        }
      }

      if (password) {
        if (!values.password) {
          errors.password = 'Required';
        }
        if (values.password !== null && values.password !== '' && values.password.length > 20) {
          errors.password = 'Must be 20 characters or less';
        }
        if (values.password !== null && values.password.length < 7 && values.password !== '') {
          errors.email = 'Invalid password';
        }
      }
      if (repeatPassword) {
        if (values.confirmPassword !== null && values.password !== values.confirmPassword) {
          errors.password = 'Password mismatch';
        }
      }

      return errors;
    },

    onSubmit: values => {
      onSubmit(values)
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      {email &&
          <EditableSpan
              type={"text"}
              className={inputStyle}
              label={'Email'}
              value={formik.values.email ? formik.values.email : ''}
              name={'email'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />}
      {formik.touched.email && formik.errors.email ?
        <span className={s.error}>{formik.errors.email}</span> : null}

      {password &&
          <EditableSpan
              className={inputStyle}
              label={'Password'}
              type={'password'}
              name={'password'}
              value={formik.values.password ? formik.values.password : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />}

      {formik.touched.password && formik.errors.password ?
        <div className={s.error}>{formik.errors.password}</div> : null}


      {repeatPassword && <EditableSpan
          className={s.footerInput}
          label={'Confirm password'}
          type={'password'}
          name={'confirmPassword'}
          value={formik.values.confirmPassword ? formik.values.confirmPassword : ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
      />}
      {checkBox && <div className={s.wrapCheckbox}>
          <EditableSpan
              type={'checkbox'}
              name='rememberMe'
              onClick={formik.handleChange}
              className={s.checkbox}
          />
          <span>Remember me</span>
      </div>}
      {buttonSubtitle &&
          <div className={s.button_wrap}>
              <Button
                  type="button"
                  className={s.subtitleRight}
                  title={'Forgot Password?'}
                  onClick={onClickHandlerNavigate}
              />
          </div>}
      {buttonSubmit &&
          <Button
              type="submit"
              className={buttonSubmitStyle}
              title={buttonSubmitTitle}
          />}
      {children}
      {buttonLink && <Button
          type="button"
          className={s.buttonLink}
          title={'Sing Up'}
          onClick={buttonLinkHandler}
      />}
    </form>
  );
})

