import { useRef, useState } from 'react'
import './App.css'
import { RecipeBook } from './components/RecipeBook'
import { RecipeEdit } from './components/RecipeEdit'

export function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Winter vegetables soup',
      description: "A delicious soup made with winter vegetables. It's a great way to use up leftover vegetables. To prepare this soup, you will need a large pot, a knife, a cutting board, a spoon, a ladle, and a vegetable peeler.",
      ingredients: [
        '1 onion',
        '2 carrots',
        '3 potatoes'
      ]
    },
    {
      id: 2,
      name: 'Burgundy beef stew',
      description: '',
      ingredients: []
    },
    {
      id: 3,
      name: 'Nassi goreng',
      description: '',
      ingredients: []
    }
  ])
  const newRecipe = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState({})

  const [shopping, setShopping] = useState([
    "1 onion",
    "2 carrots"
  ])

  function nextIndex() {
    let maxId = 0
    recipes.forEach((recipe) => {
      if (recipe.id > maxId) {
        maxId = recipe.id
      }
    })
    return maxId + 1
  }

  function addRecipe(e) {
    e.preventDefault()
    const newIndex = nextIndex()
    setRecipes([
      ...recipes,
      {
        id: newIndex,
        name: newRecipe.current.value,
        description: '',
        ingredients: []
      }
    ])
    newRecipe.current.value = ''
  }

  function editRecipe(id) {
    setIsEditing(true)
    const index = recipes.findIndex((element) => element.id == id)
    setCurrentRecipe(recipes[index])
  }

  function deleteRecipe(id) {
    setRecipes((oldRecipes) => oldRecipes.filter((recipe) => recipe.id !== id))
  }

  function handleChange(e, type, index) {
    switch (type) {
      case 'input':
        setCurrentRecipe({
          ...currentRecipe,
          name: e.target.value
        })
        break;
      case 'textarea':
        setCurrentRecipe({
          ...currentRecipe,
          description: e.target.value
        })
        break;
      case 'ingredient':
        var newIngredient = {
          ...currentRecipe
        }
        newIngredient.ingredients[index] = e.target.value
        setCurrentRecipe(newIngredient)
        break;
    }
  }

  function deleteIngredient(index) {
    var newRecipe = {...currentRecipe}
    var newRecipe = newRecipe.ingredients.splice(index, 1)
    setCurrentRecipe(newRecipe)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newIngredient = document.getElementById('newIngredient')
    var recipe = {
      ...currentRecipe
    }
    recipe.ingredients.push(newIngredient.value)
    setCurrentRecipe(recipe)
    newIngredient.value = ''
  }

  function handleSave() {
    const index = recipes.findIndex((element) => element.id == currentRecipe.id)
    var newRecipes = [...recipes]
    newRecipes.splice(index, 1)
    newRecipes.push(currentRecipe)
    setRecipes(newRecipes)
    setIsEditing(false)
  }

  function addShoppingList() {
    var shoppingList = [...shopping]
    shoppingList.push(...currentRecipe.ingredients)
    setShopping(shoppingList)
  }

  function checkAll() {
    const items = document.querySelectorAll('.shopping-list-item input')
    for(let i = 0; i < items.length; i++) {
      items[i].checked = true
    }
  }

  function uncheckAll() {
    const items = document.querySelectorAll('.shopping-list-item input')
    for(let i = 0; i < items.length; i++) {
      items[i].checked = false
    }
  }

  return (
    <div className="main">
      <h1 className="main-title">Recipe Book</h1>

      {/* Recipe Book */}
      <RecipeBook
        recipes={recipes}
        newRecipe={newRecipe}
        addRecipe={addRecipe}
        editRecipe={editRecipe}
        deleteRecipe={deleteRecipe}
      />

      {/* Recipe edit */}
      {isEditing &&
        <RecipeEdit recipe={currentRecipe}
          handleChange={handleChange}
          handleSave={handleSave}
          handleSubmit={handleSubmit}
          deleteIngredient={deleteIngredient}
          addShoppingList={addShoppingList}
        />
      }

      {/* Shopping list */}
      <div className="shopping-list">
        <h2 className="shopping-list-title">Shopping list</h2>
        <ul className="recipe-ingredients-list">
          {shopping.map((item, index) => (
            <li className="recipe-ingredient" key={index}>
              <label className="shopping-list-item"><input type="checkbox"/>{item}</label>
            </li>
          ))}
        </ul>
        <div className="shopping-list-actions">
          <button className="shopping-list-clear-button" onClick={checkAll}>Check all</button>
          <button className="shopping-list-clear-button">Clear checked items</button>
          <button className="shopping-list-clear-button" onClick={uncheckAll}>Clear all</button>
        </div>
      </div>
    </div>
  )
}

export default App
