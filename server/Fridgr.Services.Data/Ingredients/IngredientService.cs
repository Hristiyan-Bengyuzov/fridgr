using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Mapping;
using Fridgr.Web.DTOs.Ingredients;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Ingredients
{
    public class IngredientService : IIngredientService
    {
        private readonly IRepository<Ingredient> _ingredientRepository;

        public IngredientService(IRepository<Ingredient> ingredientRepository) => _ingredientRepository = ingredientRepository;

        public async Task<IEnumerable<CategoryIngredientDTO>> GetIngredientsByCategoriesAsync()
        {
            var ingredientsByCategories = await _ingredientRepository.AllAsNoTracking()
                .Include(i => i.Category)
                .GroupBy(i => i.Category)
                .Select(g => new CategoryIngredientDTO
                {
                    CategoryName = g.Key.Name,
                    Ingredients = g.Select(x => AutoMapperConfig.MapperInstance.Map<IngredientDTO>(x))
                })
                .ToListAsync();

            return ingredientsByCategories;
        }
    }
}
