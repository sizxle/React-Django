import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const[books,setBooks] = useState([]);

  useEffect(()=>{
    console.log("before use effect")
    fetchBooks();
    console.log("after use effect ")
  },[])

  const fetchBooks = async()=>{

    try{
      const response =await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json()
      console.log(data)

    }catch(err){
      console.log(err)
    }

  }

  return (
    <>
      <h1> Book Shop </h1>

      <div>
        <input type='text' placeholder='Book Title' />
        <input type='number' placeholder='Release date' />
        <button> Add Book </button>

      </div>
    </>
  )
}

export default App
