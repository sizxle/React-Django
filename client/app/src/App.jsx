import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("")
  const [release_year, setReleaseYear] = useState(0)

  useEffect(() => {
    console.log("before use effect")
    fetchBooks();
    console.log("after use effect ")
  }, [])

  const fetchBooks = async () => {

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json()
      setBooks(data)

    } catch (err) {
      console.log(err)
    }

  }

  const handleAdd = async (e) => {
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e)

    const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        release_year: release_year
      }),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    });

    const data= await response.json()
    setBooks((prev) => [...prev,data])
  }

  return (
    <>
      <h1> Book Shop </h1>

      <div>
        <form onSubmit={handleAdd} >
          <input type='text' placeholder='Book Title' name='title' value={title} onChange={e => setTitle(e.target.value)} />
          <input type='number' placeholder='Release date' value={release_year} onChange={e => setReleaseYear(e.target.value)} />
          <button type='submit'> Add Book </button>
        </form>

      </div>
      {books.map((book) =>
        <div>
          <p>Title: {book.title}</p>
          <p>Release Year: {book.release_year}</p>

        </div>)}
    </>
  )
}

export default App
