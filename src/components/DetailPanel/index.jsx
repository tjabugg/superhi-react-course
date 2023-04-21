import {Panel, P, Em, Close, CloseWrapper, BG} from './styles'
import Book from '../Book'
import React, {useEffect, useRef} from 'react'
// https://waylonwalker.com/explicit-vs-implicit-returns-in-javascript/

// 'state' will conditionally set some css properties
const DetailPanel = ({book, closePanel, state}) => {
  // https://react.dev/reference/react/useRef?ref=javascript-guides
  const panelEl = useRef(null)
  const prevBook = useRef(null)

  useEffect(() => {
    // if the prev's book current attribute isn't equal to the current book being displayed in the detail panel; set the scrollTop to 0
    if (prevBook.current !== book) {
      panelEl.current.scrollTop = 0
    }
    // Set prevBook's .current value to the current book being displayed in the detail panel
    prevBook.current = book
    // useEffect will only re-run if the values in this dependency array change
  }, [book, prevBook])

  console.log(state)
  return (
    <>
      <BG onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <CloseWrapper onClick={closePanel} $state={state}>
          <Close />
        </CloseWrapper>

        {/* Only render the book and text if there's a valid book object */}
        {/* Therefore nothing below CloseWrapper gets rendered before there's a valid book to display */}
        {/* Wrapping it in a jsx fragment because it needs a new parent element as it's being rendered inside an expression */}
        {book && (
          <>
            {/* isLarge validates whether the layout is for the panel or not */}
            <Book book={book} isLarge={true} />
            <P>{book.description}</P>
            <P>
              <Em>Published in {book.published}</Em>
            </P>
          </>
        )}
      </Panel>
    </>
  )
}
export default DetailPanel
