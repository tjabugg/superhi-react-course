import React, {useRef, useEffect, useState} from 'react'
import {debounce} from 'lodash-es'
import {Booklist, Container, H2} from './styles'
import Book from '../Book'

// Functional component with implicit return
// Destructure the props in the argument
const BooksContainer = ({books, pickBook, isPanelOpen, title }) => {
  // const [stateVariable, updateFunction] = useState(defaultValue)
  // This is going to store the scrollY as a pixel value
  const [scroll, setScroll] = useState(0)
  // https://react.dev/reference/react/useRef?ref=javascript-guides
  const prevPanelState = useRef(false)

  useEffect(() => {
    // Call debounce and save it to to the variable handleScroll, only after 100ms has passed
    // https://lodash.info/doc/debounce
    const handleScroll = debounce(() => {
      // use SetScroll as a callback with window.scrollY as an argument
      setScroll(window.scrollY)
    }, 100)
    // add isPanelOpen to a dependency array as a second argument so useEffect will only run when isPanelOpen's value changes

    // useEffect will only run when isPanelOpen's value changes
    // If the panel is closed, save the scroll position after the user's stopped scrolling
    if (!isPanelOpen) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPanelOpen])

  useEffect(() => {
    // If prevPanelState is true and the panel is closed, automatically set y as the 'scroll' variable
    if (prevPanelState.current && !isPanelOpen) {
      window.scroll(0, scroll)
    }

    // Re-define the value of prevPanelState to the value of isPanelOpen - so we always know if the panel is just open or not
    // The window is gonna scroll to our state's scroll position if the panel was previously opened but is now closed - which will maintain our scroll position
    prevPanelState.current = isPanelOpen
    // useEffect gets triggered if these variables change
  }, [isPanelOpen, prevPanelState, scroll])

  console.log(scroll)

  return (
    // Transient props are for when their sole purpose is to be consumed by a styled component and won't be passed down to other components https://jakemccambley.medium.com/transient-props-in-styled-components-3105f16cb91f
    <Container $isPanelOpen={isPanelOpen} $top={scroll}>
      <H2>{title}</H2>
      <Booklist>
        {/* Map over the books array */}
        {books.map((book) => (
          // Render a book component for each book
          <Book key={book.id} book={book} pickBook={pickBook} />
        ))}
      </Booklist>
    </Container>
  )
}
export default BooksContainer
