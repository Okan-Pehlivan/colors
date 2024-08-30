
import { useEffect, useState } from "react";

function randomColor() {
  let rr = Math.floor(Math.random()*255).toString(16).toUpperCase();
  rr = rr.length < 2 ? `0${rr}` : rr;
  
  let gg = Math.floor(Math.random()*255).toString(16).toUpperCase();
  gg = gg.length < 2 ? `0${gg}` : gg;
  
  let bb = Math.floor(Math.random()*255).toString(16).toUpperCase();
  bb = bb.length < 2 ? `0${bb}` : bb;
  
  let randomColor = `#${rr}${gg}${bb}`;

  return randomColor
}

function middleColor(colorOne, colorTwo) {
  let rrOne = parseInt(`${colorOne[1]}${colorOne[2]}`, 16)
  let ggOne = parseInt(`${colorOne[3]}${colorOne[4]}`, 16)
  let bbOne = parseInt(`${colorOne[5]}${colorOne[6]}`, 16)

  let rrTwo = parseInt(`${colorTwo[1]}${colorTwo[2]}`, 16)
  let ggTwo = parseInt(`${colorTwo[3]}${colorTwo[4]}`, 16)
  let bbTwo = parseInt(`${colorTwo[5]}${colorTwo[6]}`, 16)

  let num1 = Math.floor((rrOne + rrTwo) / 2).toString(16).toUpperCase()
  let num2 = Math.floor((ggOne + ggTwo) / 2).toString(16).toUpperCase()
  let num3 = Math.floor((bbOne + bbTwo) / 2).toString(16).toUpperCase()

  num1 = num1.length < 2 ? `0${num1}` : num1
  num2 = num2.length < 2 ? `0${num2}` : num2
  num3 = num3.length < 2 ? `0${num3}` : num3

  const result = `#${num1}${num2}${num3}`

  return result
}

function App() {
  const [colors, setColors] = useState()
  //const [colorNumber, setColorNumber] = useState(5)
  const [buttons, setButtons] = useState()
  const [buttonNumber, setButtonNumber] = useState(6)
  //const [suffle, setSuffle] = useState(true)
  const [formData, setFormData] = useState({id: "0", color: "#000000"})

  useEffect(() => {
    const template = []

    for(let i = 0; i < 5; i++) {
      template[i] = {color: randomColor(), held: false}
    }

    setColors(template)
  }, [])

  useEffect(() => {
    const template = []

    for(let i = 0; i < 6; i++) {
      template[i] = {id: i}
    }

    setButtons(template)
  }, [])

  function handleClick() {
    let newColors = colors.map((item, index) => item.held ? {color: item.color, held: item.held} : {color: randomColor(), held: item.held})

    const template = []

    for(let i = 0; i < 5; i++) {
      template[i] = {color: randomColor(), held: false}
    }

    setColors(newColors)
  }

  function addColor(id) {
    const insert = (arr, index, newItem) => [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index)
    ]

    let colorOne = `#000000`
    let colorTwo = `#ffffff`

    if(id === 0) {
      colorOne = `#000000`
      colorTwo = [...colors[id].color]
    } else if(id+1 === buttons.length) {
      colorOne = [...colors[id-1].color]
      colorTwo = `#ffffff`
    } else {
      colorOne = [...colors[id-1].color]
      colorTwo = [...colors[id].color]
    }

    const result = insert(colors, id, {color: middleColor(colorOne, colorTwo)})

    setColors(result)

    setButtonNumber(number => number + 1)

    const templateButtons = []

    for(let i = 0; i <= buttonNumber; i++) {
      templateButtons[i] = {id: i}
    }

    setButtons(templateButtons)
  }

  function deleteColor(id) {
    const result = colors.filter((item, index) => index !== id)

    setColors(result)

    const buttonResults = buttons.slice(0, -1)

    setButtons(buttonResults)

    setButtonNumber(number => number - 1)
  }

  function heldColor(i) {
    let newColors = colors.map((item, index) => index === i ? {color: item.color, held: !item.held} : item)

    setColors(newColors)
  }

  console.log(colors)

  function handleChange(event) {
    setFormData(FormData => {
        return {
            ...FormData,
            color: event.target.value
        }
    })
  }

  console.log(formData)

  function changeColor(i) {
    setFormData(FormData => {
      return {
          ...FormData,
          id: i
      }
    })

    let newColors = colors.map((item, index) => index === i ? {color: formData.color, held: item.held} : item)

    setColors(newColors)
  }

  const boxItems = colors?.map((item, index) => <div className="Box" style={{backgroundColor: item.color}}>
  <button className="deleteButton" onClick={() => deleteColor(index)}>x</button>
  <button className="deleteButton" onClick={() => heldColor(index)}>{item.held ? "o" : "-"}</button>
  <div className="hexCode">{item.color}</div>
  <input className="colorInput" type="text" onChange={handleChange} />
  <button className="deleteButton" onClick={() => changeColor(index)}>ok</button>
  </div>)

  const buttonItems = buttons?.map((item) => <button className="Button" onClick={() => addColor(item.id)}>+</button>)

  return (
    <div className="App">
      <div className="item-0">
        <div className="z-index">
          {buttonItems}
        </div>
        <div className="z-index-2">
          {boxItems}
        </div>
      </div>
      <div className="item-1">
        <button className="changeButton" onClick={handleClick}>Chance Color</button>
      </div>
    </div>
  );
}

export default App;
