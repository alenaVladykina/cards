import React from 'react'
import {Slider, SliderProps} from '@mui/material'


export const SuperRange: React.FC<SliderProps> = (props) => {




  return (
    <Slider
      getAriaLabel={() => 'Temperature range'}
      defaultValue={props.defaultValue}
      step={props.step}
      id={props.id}
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={props.onChange}
      sx={{ // стили для слайдера // пишет студент
        width: '155px',
        // backgroundColor: 'black'
      }}
      {...props} />
  )
}
