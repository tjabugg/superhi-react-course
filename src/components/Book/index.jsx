import React from 'react'
import {Container, Cover, Title, Author} from './styles'

const Book = ({book, pickBook, isLarge}) => (
  // Layout for each book
  // We're using a transient prop ($isLarge) because we've reached the lowest level of prop drilling that we need to for this data
  // At this stage, $isLarge sole purpose is gonna be consumed by this styled component
  <Container $isLarge={isLarge} onClick={() => pickBook(book)}>
    {/* Dynamically generate alt text using a template literal */}
    <Cover alt={`Book cover for ${book.title} by ${book.author}`} src={book.image} />
    <figcaption>
      <Title $isLarge={isLarge}> {book.title}</Title>
      <Author>{book.author}</Author>
    </figcaption>
  </Container>
)

export default Book
