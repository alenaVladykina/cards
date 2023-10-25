import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {cartsThunk} from "./cardSlice";
import {useNavigate, useParams} from "react-router-dom";
import s from './Cards.module.css'
import {Button} from "../../components/Button/Button";
import group from "../../icons/group 240.svg";
import {useDebounce} from "../../commons/utils";
import {Pagination} from "@mui/material";
import {Card} from "./card/Card";
import {ModalActionType, ModalType, PayloadModal} from "../modals/ModalTypes";
import {modalAC} from "../modals/modalSlice";
import {Modal} from "../modals/Modal";
import {WrapperPack} from "../../components/layout/Wrap";
import {EditableSpan} from "../../components/input/editableSpan/EditableSpan";
import {getCards} from "../../commons/selectors";


export const Cards = () => {
  const cards = useAppSelector(getCards)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {cardId, packId} = useParams()
  const [searchName, setSearchName] = useState<string>('')
  const debouncedTitle = useDebounce(searchName, 1000)
  const [page, setPage] = useState<number>(1)
  console.log(cards)

  useEffect(() => {
    dispatch(cartsThunk.fetchCards({
      cardsPack_id: cardId,
      pageCount: 8,
      page: page,
      cardQuestion: searchName,
    }))
  }, [debouncedTitle, page])


  function modalShow(type: ModalType, payload?: PayloadModal) {
    dispatch(modalAC.modalShow(true))
    dispatch(modalAC.modalType(type))
    dispatch(modalAC.payloadModal(payload ? payload : {action: '' as ModalActionType}))
  }

  const onBackNavigate = () => {
    navigate(`/packs`)
  }


  const onModalCommandCard = useCallback((payload: PayloadModal) => {
    switch (payload.action) {
      case 'CreateCard':
        const newCard = {
          cardsPack_id: cardId ? cardId : '',
          answer: payload.answer,
          question: payload.question
        }
        dispatch(cartsThunk.createCard(newCard))
        break
      case 'UpdateCard':
        const updateCard = {
          _id: payload.cardId ? payload.cardId : '',
          answer: payload.answer,
          question: payload.question
        }
        dispatch(cartsThunk.updateCard(updateCard))
        break
      case 'DeleteCard':
        dispatch(cartsThunk.removeCard(payload.cardId ? payload.cardId : ''))
        break
    }
  }, [])


  const onChangeEditableSpan = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.currentTarget.value)
  }, [])


  const onChangePaginationHandler = useCallback((e: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }, [])

  const countPagination = Math.ceil(cards.cardsTotalCount / cards.pageCount)


  const onLearnButton = useCallback(() => {
    // dispatch(modalThunk.showModal({type: 'learn', show: true}))
  }, [])

  return (
    <WrapperPack>
      <div className={s.subHeaderContainer}>
        <button onClick={onBackNavigate}
                className={s.aboutButton}>
          <img src={group} height={'20px'} alt={'icon group'}/>
          Back to Pack List
        </button>
      </div>
      <div className={s.headerContainer}>
        <h1>Friend’s Pack</h1>
        <Button type={'button'}
                title={'Add new card'}
                onClick={() => modalShow('DROPDOWN',
                  {
                    action: 'CreateCard',
                    title: 'Create Card',
                    cardsId: cardId
                  })}
                className={s.addButton}
        />
        <Button type={'button'}
                title={'Learn to pack'}
                onClick={onLearnButton}
                className={s.addButton}
        />
      </div>

      <div className={s.inputContainer}>
        <EditableSpan
          value={searchName}
          onChange={onChangeEditableSpan}
          label={'Search'}
          icon={"../../icons/glass.svg"}
          placeholder={'Provide your text'}
          className={s.inputSubtitle}/>
      </div>
      <Card
        modalShow={modalShow}
        cards={cards.cardItems}
        packId={packId}/>

      <Pagination
        count={countPagination}
        onChange={onChangePaginationHandler}/>
      <Modal onModalCommand={onModalCommandCard}/>
    </WrapperPack>
  );
};

