import React from 'react';
import s from './modal.module.css'

type PromptModalType = {
  selectedText: string
}

export const PromptModal: React.FC<PromptModalType> = ({selectedText}) => {
  return (
    <div className={s.promptModal}>
      <p>Do you really want to remove <b>{selectedText}</b>?
        All cards will be deleted.</p>
    </div>
  );
};

