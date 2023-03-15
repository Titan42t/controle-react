import { Recipe } from './Recipe'

export function RecipeBook({recipes, newRecipe, addRecipe, editRecipe, deleteRecipe}) {

    return (
        <>
            {/* Recipe creation */}
            <form onSubmit={(e) => addRecipe(e)} className="new-recipe-form">
                <input type="text" className="recipe-title-input" placeholder="Add a new recipe..." ref={newRecipe} required/>
                <button type='submit' className="recipe-create-button">Add</button>
            </form>
        
            {/* Recipe book */}
            <div className="recipe-book">
                {recipes.map(recipe => (
                    <Recipe
                        id={recipe.id}
                        name={recipe.name}
                        editRecipe={editRecipe}
                        deleteRecipe={deleteRecipe}
                        key={recipe.id}
                    />
                ))}
            </div>
        </>
    )
}