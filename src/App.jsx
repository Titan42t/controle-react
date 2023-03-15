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
    console.log(newRecipe)
    newRecipe.ingredients.splice(index, 1)
    console.log(index)
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
        />
      }

      {/* Shopping list */}
      <div className="shopping-list">
        <h2 className="shopping-list-title">Shopping list</h2>
        <ul className="recipe-ingredients-list">
          <li className="recipe-ingredient">
            <label className="shopping-list-item"><input type="checkbox"/> 1 onion</label>
          </li>
          <li className="recipe-ingredient">
            <label className="shopping-list-item"><input type="checkbox"/> 2 carrots</label>
          </li>
          <li className="recipe-ingredient">
            <label className="shopping-list-item"><input type="checkbox"/> 3 potatoes</label>
          </li>
        </ul>
        <div className="shopping-list-actions">
          <button className="shopping-list-clear-button">Check all</button>
          <button className="shopping-list-clear-button">Clear checked items</button>
          <button className="shopping-list-clear-button">Clear all</button>
        </div>
      </div>
    </div>
  )
}

export default App
