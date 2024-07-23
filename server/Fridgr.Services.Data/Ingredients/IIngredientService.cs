using Fridgr.Web.DTOs.Ingredients;

namespace Fridgr.Services.Data.Ingredients
{
    public interface IIngredientService
    {
        Task<IEnumerable<CategoryIngredientDTO>> GetIngredientsByCategoriesAsync();
    }
}
