import React, {ChangeEvent} from 'react';
import {Pagination} from "@mui/material";

type PaginationComponentPropsType = {
  onChange: (page: number) => void
  count?: number
}

export const PaginationComponent: React.FC<PaginationComponentPropsType> = React.memo(({onChange, count}) => {

  const onChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
    onChange(page);
  }

  return (
    <Pagination
      count={count}
      onChange={onChangeHandler}/>
  );
})
