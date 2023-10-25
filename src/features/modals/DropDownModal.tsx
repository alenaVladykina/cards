import React, {useEffect, useState} from 'react';
import s from './modal.module.css'
import {Select} from '../../components/select/Select';
import {EditableSpan} from "../../components/input/editableSpan/EditableSpan";

type DropDownModalType = {
  answer: string
  question: string
  setAnswer: (value: string) => void
  setQuestion: (value: string) => void
  defaultQuestion: string
  defaultAnswer: string
}

export const DropDownModal: React.FC<DropDownModalType> = ({
                                                             setAnswer,
                                                             setQuestion,
                                                             answer,
                                                             question,
                                                             defaultQuestion,
                                                             defaultAnswer
                                                           }) => {

  const options = ['Text', 'Image', 'Video']


  const changeAnswer = (e: any) => {
    setAnswer(e.target.value)
  }

  const changeQuestion = (e: any) => {
    setQuestion(e.target.value)
  }

  const handleSelect = (option: any) => {
  }

  return (
    <div
      className={s.dropDownModal}>
      <Select className={s.select}
              label={'Choose a question format'}
              onChangeOption={handleSelect}
              options={options}
      />
      <EditableSpan className={s.input}
                    label={'Question'}
                    value={question ? question : defaultQuestion}
                    onChange={changeQuestion}/>
      <EditableSpan className={s.input}
                    label={'Answer'}
                    value={answer ? answer : defaultAnswer}
                    onChange={changeAnswer}/>
    </div>
  );
};
