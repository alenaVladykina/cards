import {PackType} from "../packs/packsTypes";
import type React from "react";


export type ModalType = 'PROMPT' | 'CONFIRM' | 'DROPDOWN'

export  type ModalsType = { [Property in ModalType]: React.ElementType };


export type ModalActionType =
  'CreatePack'
  | 'UpdatePack'
  | 'DeletePack'
  | 'LearnPack'
  | 'CreateCard'
  | 'UpdateCard'
  | 'DeleteCard'

export type PayloadModal = {
  action: ModalActionType
  selectTitle?: string
  title?: string
  pack?: PackType
  id?: string
  value?: string
  private?: boolean
  cardsId?: string
  cardId?:string
  answer?: string
  question?: string
}

export type ShowModal = {
  type: ModalType,
  payload?: PayloadModal
}