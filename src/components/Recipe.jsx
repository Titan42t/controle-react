export function Recipe({id, name, editRecipe, deleteRecipe}) {
    return (
        <div className="recipe">
            <div className="recipe-title">{name}</div>
            <div className="recipe-actions">
                <button className="recipe-edit-button" onClick={() => editRecipe(id)}>Edit</button>
                <button className="recipe-delete-button" onClick={() => deleteRecipe(id)}>Delete</button>
            </div>
        </div>
    )
}