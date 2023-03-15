export function RecipeEdit({recipe, handleChange, handleSave, handleSubmit, deleteIngredient}) {
    return(
        <div className="recipe-edit-form">
            <input type="text" className="recipe-edit-title-input" onChange={(e) => handleChange(e, 'input')} value={recipe.name}/>
            <textarea rows={10} className="recipe-edit-description-input" onChange={(e) => handleChange(e, 'textarea')} value={recipe.description}/>
            <h2 className="recipe-ingredients-title">Ingredients</h2>
            <ul className="recipe-ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                    <li className="recipe-ingredient" key={index}>
                        <input type="text" className="recipe-ingredient-input"
                            onChange={(e) => handleChange(e, 'ingredient', index)} defaultValue={ingredient}
                        />
                        <button className="recipe-ingredient-delete-button" onClick={() => deleteIngredient(index)}>🗑</button>
                    </li>
                ))}
                <form className="recipe-new-ingredient" onSubmit={handleSubmit}>
                    <input type="text" id="newIngredient" className="recipe-new-ingredient-input" placeholder="Add a new ingredient..."/>
                    <button type="submit" className="recipe-new-ingredient-button">Add</button>
                </form>
            </ul>
            <div className="recipe-edit-actions">
                <button className="recipe-edit-save-button" onClick={handleSave}>Save</button>
                <button className="recipe-edit-cart-button">Add to shopping list</button>
            </div>
        </div>
    )
}