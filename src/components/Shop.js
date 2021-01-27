import '../App.css';
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles/list.scss'
import '../styles/autocomplete.scss'


function Shop() {
  const [items, setItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])
  const [dropDownItems, setDropDownItems] = useState([])
  const [textInput, setTextInput] = useState('')

  useEffect(()=> {
    fetchItems()
    allItems()
  }, [])

  useEffect(()=>{
      if (textInput.length === 0) {
        setDropDownItems([])
      } else {
        const filteredItems = displayedItems.filter(i => i.name.toLowerCase().includes(textInput.toLowerCase()))
        setDropDownItems(filteredItems)
      }
  }, [textInput])

  const fetchItems = async () => {
    const itemsPromise = await fetch('https://fortnite-api.com/v2/cosmetics/br/new');
    const response = await itemsPromise.json()
    const newItems = response.data.items
    console.log(newItems)

    setItems(newItems)
  } 

  const allItems = async () => {
    const itemsPromise = await fetch('https://fortnite-api.com/v2/cosmetics/br')
    const res = await itemsPromise.json()
    const items = res.data
    
    const allNames = items.map(i => {
      return {id: i.id, name: i.name}
    })

    setDisplayedItems(allNames)
  }

  const userInputHandler = (e) => {
    setTextInput(e.target.value)
  }
  
  return (
    <div >
      <form autoComplete="off">
        <div className='autocomplete' style={{width: '300px'}}>
          <input 
            onChange={userInputHandler} 
            type="text" 
            placeholder="Search an item"
          />
          <div 
            id="autocomplete-list">
            {dropDownItems.map(i => 
              <div id="each-item"><Link to={`/shop/${i.id}`}>{i.name}</Link></div>
              )
            }
          </div>
        </div>
      </form>
      {items.map((i) => 
        (<div className="items">
          <Link to={`/shop/${i.id}`}>{i.name}</Link>
          </div>)
      )}
    </div>
  );
}

export default Shop;