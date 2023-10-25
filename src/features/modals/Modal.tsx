import React, {KeyboardEventHandler, useEffect, useState} from 'react';
import s from './modal.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {modalAC} from "./modalSlice";
import {PromptModal} from "./PromptModal";
import {ConfirmModal} from "./ConfirmModal";
import {ModalsType, ModalType, PayloadModal} from "./ModalTypes";
import {ButtonModal} from "../../components/Button/ButtonModal";
import {getModal} from "../../commons/selectors";
import {DropDownModal} from "./DropDownModal";


type IModalType = {
  onModalCommand: (payload: PayloadModal) => void
}


function getModalByType(type: ModalType): React.ElementType {
  return modals[type];
}


const modals: ModalsType = {
  PROMPT: PromptModal,
  CONFIRM: ConfirmModal,
  DROPDOWN: DropDownModal
}


export const Modal: React.FC<IModalType> = ({onModalCommand}) => {
  const modal = useAppSelector(getModal)
  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [privateValue, setPrivateValue] = useState<boolean>(modal.payloadModal.private)
  const [answer, setAnswer] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const defaultName = modal.payloadModal.value
  const defaultQuestion = modal.payloadModal.question
  const defaultAnswer = modal.payloadModal.answer

  if (!modal.show) return null


  const backgroundOnClick = () => {
    dispatch(modalAC.modalShow(false))
  }

  const ContentModal = getModalByType(modal.typeModal)


  const changePrivate = (value: boolean) => {
    setPrivateValue(value)
  }


  const closeModal = () => {
    dispatch(modalAC.modalShow(false))
  }

  const handleClick = () => {
    const payload: PayloadModal = modal.payloadModal
    onModalCommand({
      ...payload,
      value: name,
      private: privateValue,
      answer,
      question
    })
    closeModal()
  }

  const onKeyPressCallback: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  const titleButton = modal.typeModal === 'CONFIRM' || modal.typeModal === 'DROPDOWN'


  return (
    <div>
      <div
        className={s.modalBackground}
        onClick={backgroundOnClick}
      />
      <div
        className={s.modal}
        onKeyPress={onKeyPressCallback}
      >
        <div className={s.headerWrap}>
          <div className={s.headerContainer}>
            <h2 className={s.header}>{modal.payloadModal.title}</h2>
            <button type={'button'}
                    className={s.close}
                    onClick={closeModal}
            />
          </div>
        </div>

        <ContentModal
          name={name}
          defaultQuestion={defaultQuestion}
          defaultAnswer = {defaultAnswer}
          defaultName={defaultName}
          selectedText={modal.payloadModal.value}
          changePrivate={changePrivate}
          privateStatus={modal.payloadModal.private}
          setAnswer={setAnswer}
          setQuestion={setQuestion}
          answer={answer}
          question={question}
          setName={setName}
        />
        <div className={s.buttonContainer}>
          <ButtonModal title='Cansel'
                       onClick={closeModal}
          />
          <ButtonModal
            onClick={handleClick}
            title={titleButton
              ? 'Save'
              : 'Delete'}
          />
        </div>
      </div>
    </div>
  );
};

