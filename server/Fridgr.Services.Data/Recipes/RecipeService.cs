using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Data.Images;
using Fridgr.Services.Data.Ingredients;
using Fridgr.Services.Mapping;
using Fridgr.Web.DTOs.Recipes;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Recipes
{
    public class RecipeService : IRecipeService
    {
        private readonly IRepository<Recipe> _recipeRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IIngredientService _ingredientService;

        public RecipeService(IRepository<Recipe> recipeRepository, ICloudinaryService cloudinaryService, IIngredientService ingredientService)
        {
            _recipeRepository = recipeRepository;
            _cloudinaryService = cloudinaryService;
            _ingredientService = ingredientService;
        }

        public async Task CreateRecipeAsync(CreateRecipeDTO createRecipeDTO)
        {
            var recipe = new Recipe
            {
                Name = createRecipeDTO.Name,
                Image = _cloudinaryService.UploadImage(createRecipeDTO.Image)
            };

            foreach (var ingredientId in createRecipeDTO.IngredientIds)
            {
                recipe.Ingredients.Add(new RecipeIngredient
                {
                    IngredientId = ingredientId,
                    Recipe = recipe
                });
            }

            foreach (var instructionText in createRecipeDTO.Instructions)
            {
                recipe.Instructions.Add(new Instruction
                {
                    Text = instructionText,
                    Recipe = recipe,
                });
            }

            await _recipeRepository.AddAsync(recipe);
            await _recipeRepository.SaveChangesAsync();
        }

        public async Task<RecipeDetailsDTO?> GetRecipeDetailsAsync(int id)
        {
            var recipe = await _recipeRepository.AllAsNoTracking()
                .Include(r => r.Instructions)
                .Include(r => r.Ingredients)
                .ThenInclude(ri => ri.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe is null) return null;

            return new RecipeDetailsDTO
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Image = recipe.Image,
                Ingredients = recipe.Ingredients.Select(ri => ri.Ingredient.Name),
                Instructions = recipe.Instructions.Select(i => i.Text)
            };
        }

        public async Task<IEnumerable<RecipeDTO>> GetRecipesByIngredientsAsync(IEnumerable<int> ingredients)
        {
            var recipes = await _recipeRepository.AllAsNoTracking()
                .Include(r => r.Ingredients)
                .Where(r => r.Ingredients.All(ri => ingredients.Contains(ri.IngredientId)))
                .To<RecipeDTO>()
                .ToListAsync();

            return recipes;
        }
    }
}
