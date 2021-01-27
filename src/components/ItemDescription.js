import '../App.css';
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles/item.scss'

function ItemDescription({match}) {

  useEffect(()=> {
    fetchItem()
    console.log(match)
  }, [])

  const [item, setItem] = useState({})
  const [image, setImage] = useState('')
  const [rarity, setRarity] = useState('')
  const [description, setDescription] = useState('')

  const fetchItem = async () => {
    const itemPromise = await fetch(`https://fortnite-api.com/v2/cosmetics/br/${match.params.id}`)
    const response = await itemPromise.json()
    // const item = response
    console.log(response.data)
    setItem(response.data)
    setImage(response.data.images.icon)
    setRarity("[" + response.data.rarity.value + "]")
    setDescription(`"` + response.data.description + `"`)
  } 
  return (
    <div>
      <h1 className='description'>{item.name} <span>{rarity.toUpperCase()}</span></h1>
      <section><p>{description}</p></section>
      <img src={image} alt={item.name}/>
    </div>
  );
}

export default ItemDescription;
