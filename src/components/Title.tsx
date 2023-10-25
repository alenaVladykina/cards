import React from 'react';

type TitlePropsType = {
  title: string
}

export const Title: React.FC<TitlePropsType> = React.memo(({title}) => {
  return (
    <h1>
      {title}
    </h1>
  );
})
