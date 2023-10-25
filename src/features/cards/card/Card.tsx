import React from 'react';
import s from "../Cards.module.css";
import starColor from "../../../icons/starColor.svg";
import star from "../../../icons/star.svg";
import {displayDate} from "../../../commons/utils";
import pen from "../../../icons/pen.svg";
import basketIcon from "../../../icons/basket.svg";
import {ModalType, PayloadModal} from "../../modals/ModalTypes";
import {CardType} from "../CardsTypes";


type CardElementType = {
  cards: CardType[]
  packId: string | undefined
  modalShow: (type: ModalType, payload?: PayloadModal) => void
}


export const Card: React.FC<CardElementType> = ({
                                                  cards,
                                                  packId,
                                                  modalShow
                                                }) => {


  const cardsItems = cards.map((card: CardType) => {

      const onClickUpdateCards = () => {
        modalShow('DROPDOWN',
          {
            action: 'UpdateCard',
            cardId: card._id,
            answer: card.answer,
            question: card.question,
            title: 'Edit card'
          })
      }

      const userCard = packId === card.user_id

      const onClickRemoveCard = () => {
        modalShow('PROMPT',
          {
            action: "DeleteCard",
            cardId: card._id,
            value: card.answer,
            title: 'Delete Card'
          })
      }

      const grades = () => {
        let stars = []
        const grade = Math.ceil(card.grade)
        for (let i = 1; i <= 5; i++) {
          if (grade && grade >= i) {
            stars.push(<img src={starColor} alt={'icons'} key={i}/>)
          } else {
            stars.push(<img src={star} alt={'icons'} key={i}/>)
          }
        }
        return stars
      }

      return (
        <tr key={card._id} id={card._id}>
          <td>{card.question}</td>
          <td>{card.answer}</td>
          <td>{displayDate(card.updated)}</td>
          <td>{grades()}</td>
          <td>
            {userCard ?
              <>
                <button
                  onClick={onClickUpdateCards}
                  className={s.buttonAction}>
                  <img src={pen} height={'40px'} alt={'icon'}/>
                </button>
                <button onClick={onClickRemoveCard}
                        className={s.buttonAction}>
                  <img src={basketIcon} height={'40px'} alt={'icon'}/>
                </button>
              </>
              : ''
            }
          </td>
        </tr>
      )
    }
  )


  return (
    <table className={s.table}>
      <thead>
      <tr className={s.trHeader}>
        <th className={s.thName}>Question</th>
        <th className={s.thAnswer}>Answer</th>
        <th className={s.thUpdated}>Last Updated</th>
        <th className={s.thCrated}>Grade</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {cardsItems}
      </tbody>
    </table>
  );
};
