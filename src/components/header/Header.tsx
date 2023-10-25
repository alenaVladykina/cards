import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../app/store";
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar, Icon} from "@mui/material";
import {getProfile} from "../../commons/selectors";
import defaultAva from '../../icons/defaultAvatar.jpg'
import s from './header.module.css'


export const Header = () => {
  const avatar = useAppSelector(getProfile)?.avatar
  const name = useAppSelector(getProfile)?.name
  const navigate = useNavigate()


  const goToRegisterHandler = () => {
    navigate('/profile')
  };


  return (
    <div onClick={goToRegisterHandler}>
      <div className={s.headerWrap}>
        <span>{name ? name : 'User'}</span>
        <Avatar
          alt="photo Avatar"
          src={avatar ? avatar : defaultAva}
          sx={{height: 50, width: 50}}
        />
      </div>
      <div className={s.hr}></div>
    </div>
  );
};

