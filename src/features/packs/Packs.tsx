import {useAppDispatch, useAppSelector} from "../../app/store";
import {getAuth, getPacks} from "../../commons/selectors";
import {useCallback, useEffect, useMemo, useState} from "react";
import {SortColumnType} from "./packsTypes";
import {PaginationComponent} from "../../components/Pagination";
import {packThunk} from "./packsSlice";
import {useDebounce} from "../../commons/utils";
import s from './packs.module.css'
import {Button} from "../../components/Button/Button";
import {Toolbar} from "../toolbar/Toolbar";
import {PackList} from "../packList/PackList";
import {Title} from "../../components/Title";
import {Modal} from "../modals/Modal";
import {modalAC} from "../modals/modalSlice";
import {ModalActionType, ModalType, PayloadModal} from "../modals/ModalTypes";


export const Packs = () => {
  const packsList = useAppSelector(getPacks)
  const packId = useAppSelector(getAuth).profile?._id
  const dispatch = useAppDispatch()

  const [page, setPage] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>('')
  const debouncedTitle = useDebounce(searchName, 1000)
  const [userCard, setUserCard] = useState<string>('')
  const [sortColumn, setSort] = useState<SortColumnType>({
    name: '',
    order: false,
  })
  const [minMaxValue, setMinMaxValue] = useState<{ min: number, max: number }>({
    min: 0,
    max: 100
  })


  useEffect(() => {
    sessionStorage.setItem("cardsPATH", "/packs");
    dispatch(packThunk.fetchPacks({
      page,
      packName: searchName,
      user_id: userCard,
      sortPacks: Number(sortColumn.order) + sortColumn.name,
      min: minMaxValue.min,
      max: minMaxValue.max
    }))
  }, [page, debouncedTitle, userCard, sortColumn, minMaxValue])


  function showModal(type: ModalType, payload?: PayloadModal) {
    dispatch(modalAC.modalShow(true))
    dispatch(modalAC.modalType(type))
    dispatch(modalAC.payloadModal(payload ? payload : {action: '' as ModalActionType}))
    console.log(payload?.value)
  }


  const onModalCommandPack = (payload: PayloadModal) => {
    switch (payload.action) {
      case 'DeletePack':
        dispatch(packThunk.removePacks(payload.id ? payload.id : ''))
        break
      case 'CreatePack':
        const newPack = {name: payload.value, private: payload.private, sortPacks: 0}
        dispatch(packThunk.createPacks(newPack))
        break
      case 'UpdatePack':
        const updatePack = {
          ...payload.pack,
          private: payload.private,
          name: payload.value
        }
        dispatch(packThunk.updatePacks(updatePack))
        break
    }
  }

  const changePagination = useCallback((page: number) => {
    setPage(page)
  }, [])

  const onChangeEditTableSpan = useCallback((value: string) => {
    setSearchName(value)
  }, [])

  const filterMyAllPacks = useCallback((value: boolean) => {
    if (value && packId) {
      setUserCard(packId)
    } else {
      setUserCard('')
    }
  }, [packId])

  const filterMinMax = (value1: number, value2: number) => {
    setMinMaxValue({min: value1, max: value2})
  }

  const filterColumn = useCallback((value: string) => {
    let order = sortColumn.order
    const newOrder = sortColumn.name === value ? !order : false
    setSort({...sortColumn, name: value, order: newOrder})
  }, [])


  const countPagination = useMemo(() =>
      Math.ceil(packsList.cardPacksTotalCount / packsList.pageCount),
    [packsList.cardPacksTotalCount, packsList.pageCount]
  )

  return (
    <div className={s.wrapPack}>
      <div className={s.packContent}>
        <div className={s.wrapperHeader}>
          <Title title={'Packs list'}/>
          <Button className={s.addButton}
                  title={'Add new pack'}
                  onClick={() => showModal(
                    'CONFIRM',
                    {
                      action: 'CreatePack',
                      title: 'Add new pack'
                    })
                  }
          />
        </div>
        <Toolbar
          filterMinMax={filterMinMax}
          searchName={searchName}
          onChangeEditTableSpan={onChangeEditTableSpan}
          userCard={userCard}
          filterPacks={filterMyAllPacks}/>

        <PackList
          packId={packId}
          packsList={packsList.cardPacks}
          filterColumn={filterColumn}
          handlerShowModal={showModal}
        />
        <PaginationComponent
          count={countPagination}
          onChange={changePagination}
        />
        <Modal onModalCommand={onModalCommandPack}/>
      </div>
    </div>
  )
}




