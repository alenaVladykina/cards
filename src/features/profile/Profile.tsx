import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getProfile} from "../../commons/selectors";
import s from './profile.module.css'
import {Avatar, Badge} from "@mui/material";
import {authThunk} from "../auth/authReduser";
import logoutIcon from '../../icons/logout.svg'
import {EditableSpan} from "../../components/input/editableSpan/EditableSpan";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {Wrapper} from "../../components/layout/Wrap";
import {Button} from "../../components/Button/Button";
import group from "../../icons/group 240.svg";
import {useNavigate} from "react-router-dom";


export const Profile = () => {
  const profile = useAppSelector(getProfile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const nameInitiative = profile?.name ? profile.name : ''

  const [name, setName] = useState<string>(nameInitiative)

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [avatar, setAvatar] = useState(profile?.avatar)


  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAvatar(file64)
          dispatch(authThunk.changeDateProfile({avatar: file64}))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const onPacksNavigate = () => {
    navigate('/packs')
  }

  const onClickUpdateName = () => {
    setIsEdit(true)
  }

  const onChangeName = (e: string) => {
    setName(e)
  }

  const onClickButton = () => {
    dispatch(authThunk.changeDateProfile({name}))
    setIsEdit(false)
  }

  const closeInput = () => {
    debugger
    setIsEdit(false)
  }

  return (
    <React.Fragment>
      <button onClick={onPacksNavigate}
              className={s.aboutButton}>
        <img src={group} height={'20px'} alt={'icon group'}/>
        Back to Pack List
      </button>
      <Wrapper>
        <div className={s.profile}>
          <h2>Personal Info</h2>

          <label className={s.label}>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
            />
            <Badge
              overlap="circular"
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              badgeContent={
                <AddAPhotoIcon
                  sx={{
                    width: 35,
                    height: 35,
                    color: 'blue',
                  }}
                />
              }
            >
              <Avatar
                alt="profile icon"
                sx={{width: 150, height: 150}}
                src={avatar}/>
            </Badge>
          </label>


          {isEdit ?
            <div className={s.form}>
              <EditableSpan type={'text'}
                            onKeyPress={onClickButton}
                            onBlur={closeInput}
                            onDoubleClick={closeInput}
                            label={'Nickname'}
                            className={s.input}
                            value={name}
                            onChangeText={onChangeName}
              />
              <Button
                className={s.saveButton}
                onClick={onClickButton}
                title={'save'}
              />
            </div>
            :
            <div className={s.wrapTitle}>
              <span className={s.title}>{name ? name : 'User'}</span>
              <DriveFileRenameOutlineIcon
                onClick={onClickUpdateName}/>
            </div>
          }

          <p className={s.subtitle}>{profile?.email}</p>
          <button
            className={s.button}>
            <img alt='icon in button'
                 className={s.iconButton}
                 src={logoutIcon}/>
            Log out
          </button>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};





