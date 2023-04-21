import styled from 'styled-components'
import { Pill } from '../../styles'

export const Panel = styled.article`
  background-color: #ffe581;
  border-left: 2px solid #000;
  /* 82px = Header height */
  height: calc(100vh - 82px);
  width: 660px;
  position: fixed;
  z-index: 2;
  right: ${({$state}) => ($state === 'entering' || $state === 'entered' ? 0 : '-660px')};
  bottom: 0;
  box-sizing: border-box;
  padding: 40px 120px 60px 40px;
  overflow: scroll;
  transition: 300ms;

  @media (max-width: 800px) {
    border-left: none;
    padding: 40px 86px 20px 20px;
    width: 100vw;
    height: calc(100vh - 75px);
    z-index: ${({$state}) => ($state === 'entering' || $state === 'entered' ? 0 : '-100vh')};
    /* Only appear in from the bottom */
    right: unset;
  }
`

export const P = styled.p`
  font-family: 'Libre Baskerville', serif;
  font-size: 16px;
  line-height: 1.6;
  margin: 30px 0 0;
`

export const Em = styled.em`
  font-style: italic;
`

export const Close = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 24px;
  width: 24px;
  padding: 0;
  position: relative;

  &::before,
  &::after {
    background-color: #000;
    content: '';
    height: 24px;
    width: 2px;
    position: absolute;
    top: 0;
    left: 9px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`

export const CloseWrapper = styled(Pill)`
  display: ${({$state}) => ($state === 'entered' ? 'flex' : 'none')};
  cursor: pointer;
  top: 120px;
  right: 40px;
  position: fixed;
  z-index: 100;

  @media (max-width: 800px) {
    top: unset;
    bottom: 20px;
    right: 20px;
  }
`

export const BG = styled.div`
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 1;
  /* Structure the expression as a callback then destructure $state as the argument and write a turnary statement */
  /* If the state = entering or entered, set the opacity to 1 */
  opacity: ${({$state}) => ($state === 'entering' || $state === 'entered' ? 1 : 0)};
  /* Remove the pointer event when the detail panel is hidden */
  pointer-events: ${({$state}) => ($state === 'exited' ? 'none' : 'auto')};
  transition: 300ms;
`
