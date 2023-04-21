// import React
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect
import React, {useState, useEffect} from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import DetailPanel from './components/DetailPanel'
import Search from './components/Search'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'

// Function expression
const App = () => {
  // Store the api response as an array called 'books' with the function 'setBooks' to update it
  const [books, setBooks] = useState([])
  // State variable with a null default value
  const [selectedBook, setSelectedBook] = useState(null)
  // Track the panel's open and close status
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([])

  // Fetch our data and store it in a state variable
  // Effect hook is used for creating side effects in a component - schedules events to happen after it has rendered to the dom
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

    const fetchData = async () => {
      // The try...catch statement marks a block of statements to try, and specifies a response, should an exception be thrown.
      try {
        // Wait until the return promise is complete
        const response = await fetch('https://book-club-json.herokuapp.com/books')
        // Turn the json object into a JavaScript object e.g. string
        const books = await response.json()
        // Update the states variable books value
        setBooks(books)
        setFilteredBooks(books)
      } catch (errors) {
        // console.log(errors)
      }
    }
    // Define a dependency array as the 2nd argument in the useEffect argument, but we'll just pass in an empty array because our effect doesn't rely on any props since our data is coming from an external source and so doesn't need to re-run once it's collected the data
    fetchData()
  }, [])

  // Picking books
  const pickBook = (book) => {
    setSelectedBook(book)
    setShowPanel(true)
  }

  // If closePanel is triggered, set the value to false
  const closePanel = () => {
    setShowPanel(false)
  }

  const filterBooks = (searchTerm) => {
    // stringSearch is a helper function  for translating attributes to a lowercase string, then checking if one string is included within another
    const stringSearch = (bookAttribute, searchTerm) =>
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())

    // If there's no search term, display all books
    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      // Use the stringSearch function compare the searchTerm to each book's title or author and save the matches in a new list
      setFilteredBooks(
        books.filter(
          (book) => stringSearch(book.title, searchTerm) || stringSearch(book.author, searchTerm)
        )
      )
    }
  }

  // Conditionally render the title for the book container, if they're different, it's true
  const hasFiltered = filteredBooks.length !== books.length

  // console.log(filterBooks(null))
  // console.log(filterBooks('beale'))

  return (
    <>
      {/* Books prop for the BooksContainer component and pass down the books value from the state variable */}
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks} />
      </Header>
      <BooksContainer
        books={filteredBooks}
        pickBook={pickBook}
        isPanelOpen={showPanel}
        // The page title will change depending if hasFiltered is true
        title={hasFiltered ? 'Search results' : 'All books'}
      />
      {/* https://reactcommunity.org/react-transition-group/transition */}
      <Transition in={showPanel} timeout={300}>
        {/* Always render the detail panel but change its position on the screen */}
        {/* Using render props so that we can access its state, because the state will work nicely with the transition component and will allow us to track enter and exit states for the detail panel */}
        {(state) => <DetailPanel book={selectedBook} closePanel={closePanel} state={state} />}
      </Transition>
    </>
  )
}

export default App
