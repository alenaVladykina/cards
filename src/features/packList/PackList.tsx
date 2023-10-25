import React from 'react';
import s from "./packList.module.css";
import hatIcon from "../../icons/hat.svg";
import penIcon from "../../icons/pen.svg";
import basketIcon from "../../icons/basket.svg";
import {useParams, useNavigate} from "react-router-dom";
import {displayDate} from "../../commons/utils";
import {PackType} from "../packs/packsTypes";
import {ModalType, PayloadModal} from "../modals/ModalTypes";


type CardListPropsType = {
  filterColumn: (value: string) => void
  packsList: PackType[]
  handlerShowModal: (type: ModalType, payload?: PayloadModal) => void
  packId: string | undefined
}


export const PackList: React.FC<CardListPropsType> = React.memo(({
                                                                   filterColumn,
                                                                   packsList,
                                                                   handlerShowModal,
                                                                   packId
                                                                 }) => {

  const navigate = useNavigate()

  const packItems = packsList.map((pack: PackType) => {

    const userCard = pack.user_id === packId

    const handleNavigate = () => {
      const cardId = pack._id
      navigate(`/packs/${packId}/${cardId}`)
    }

    const handleUpdatePack = () => {
      handlerShowModal(
        'CONFIRM',
        {
          pack: pack,
          action: 'UpdatePack',
          value: pack.name,
          title: 'Edit pack',
          // id:pack._id
        })
    }


    const handleRemovePack = () => {
      handlerShowModal('PROMPT', {
        id: pack._id,
        action: 'DeletePack',
        value: pack.name,
        title: 'Delete Pack'
      })
    }
    return (
      <tr key={pack._id} id={pack._id}>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{displayDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
          {userCard &&
              <>
                  <button
                      className={s.buttonAction}
                      onClick={handleNavigate}>
                      <img src={hatIcon} height={'40px'} width={'40px'} alt={'icon'}/>
                  </button>
                  <button
                      className={s.buttonAction}
                      onClick={handleUpdatePack}>
                      <img src={penIcon} height={'40px'} alt={'icon'}/>
                  </button>
                  <button
                      className={s.buttonAction}
                      onClick={handleRemovePack}>
                      <img src={basketIcon} height={'40px'} alt={'icon'}/>
                  </button>
              </>}
          {!userCard && <button className={s.buttonAction}
                                onClick={handleNavigate}>
              <img src={hatIcon}
                   height={'40px'}
                   alt={'icon'}/>
          </button>}
        </td>
      </tr>
    )
  })


  return (
    <table className={s.table}>
      <tbody>
      <tr className={s.trHeader}>
        <th
          className={s.thName}
          onClick={() => filterColumn('name')}
        >Name
        </th>
        <th
          className={s.thCards}
          onClick={() => filterColumn('cardsCount')}
        >Cards
        </th>
        <th
          className={s.thUpdated}
          onClick={() => filterColumn('updated')}
        >Last Updated
        </th>
        <th
          onClick={() => filterColumn('created')}
          className={s.thCrated}>Created by
        </th>
        <th
          className={s.thActions}>Actions
        </th>
      </tr>
      {packItems}
      </tbody>
    </table>
  );
})

