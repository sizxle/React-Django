import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("")
  const [release_year, setReleaseYear] = useState(0)

  const [newTitle, setNewTitle] = useState("")

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

  const handleChange= async(id, release_year)=>{
    const response = await fetch("http://127.0.0.1:8000/api/books/update/"+id, {
      method: 'PUT',
      body: JSON.stringify({
        title: newTitle,
        release_year: release_year
      }),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    });

    
    const data= await response.json()
    setBooks((prev) => prev.map(book=>{
      if(book.id==id){
        return data;
      }else{
        return book;
      }
    }))


  }
  const handleDelete = async(id) =>{
    const response = await fetch("http://127.0.0.1:8000/api/books/delete/"+id, {
      method: 'DELETE',
    });

    setBooks((prev)=> prev.filter(book => {
      book.id!==id
    }));
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
          <input type='text' placeholder='New title'  onChange={e => setNewTitle(e.target.value)}/>
          <button onClick={()=>handleChange(book.id,book.release_year)}>Change Title</button>
          <button onClick={()=>handleDelete(book.id)}>Delete</button>
        </div>)}
    </>
  )
}

export default App
