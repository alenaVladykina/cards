import React, {ChangeEvent} from 'react';
import s from './modal.module.css'
import {CheckBoxInput} from "../../components/input/CheckBoxInput";
import {EditableSpan} from "../../components/input/editableSpan/EditableSpan";


type ConfirmModal = {
  name: string
  setName: (value: string) => void
  changePrivate: (value: boolean) => void
  privateStatus: boolean
  defaultName: string
}

export const ConfirmModal: React.FC<ConfirmModal> = ({
                                                       name,
                                                       setName,
                                                       changePrivate,
                                                       privateStatus,
                                                       defaultName
                                                     }) => {


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePrivate = (value: boolean) => {
    changePrivate(value)
  }

  return (
    <div className={s.confirmModal}>
      <EditableSpan
        label={'Name Pack'}
        className={s.input}
        value={name ? name : defaultName}
        onChange={onChange}
      />
      <CheckBoxInput
        title={'Private pack'}
        handlePrivate={handlePrivate}
        privateValue={privateStatus}
      />

    </div>
  );
};

