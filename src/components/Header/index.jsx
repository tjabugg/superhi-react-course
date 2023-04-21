import React from 'react'
import {Logo, HeaderContainer} from './styles'

const Header = ({children}) => (
  <HeaderContainer>
    {/* '/' means clicking the logo simply refreshes the page */}
    <a href="/">
      <Logo title="Book Club logo" />
    </a>
    {/* This is where the search component will render */}
    {children}
  </HeaderContainer>
)

export default Header
