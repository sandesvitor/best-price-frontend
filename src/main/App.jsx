import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [product, setProduct] = useState([{}])

  useEffect(() => {

    axios.get('https://api-bestprice.herokuapp.com/products')
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(console.log)

  }, [])

  return (
    <h1>Hello World</h1>
  )
}

export default App;
