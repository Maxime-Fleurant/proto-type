import { css } from '@emotion/core';
import tw from '@tailwindcssinjs/macro';

export const grid = css(tw('grid grid-cols-24 gap-4'));

export const cell1 = css(
  {
    gridRowStart: 3,
    gridRowEnd: 5,
    gridColumnStart: 9,
    gridColumnEnd: 17,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
    border: '1px solid grey',
  },
  css`
    ${tw('text-4xl text-gray-800 h-24 leading-10')}
  `,
);

export const headerStyle = css(
  { gridRowStart: 1, gridRowEnd: 2, gridColumnStart: 1, gridColumnEnd: 25 },
  css`
    ${tw('flex flex-row justify-between')}
  `,
);
