using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fridgr.Data.Models
{
    [PrimaryKey(nameof(RecipeId), nameof(IngredientId))]
    public class RecipeIngredient
    {
        [ForeignKey(nameof(Recipe))]
        public int RecipeId { get; set; }

        [Required]
        public Recipe Recipe { get; set; } = null!;

        [ForeignKey(nameof(Ingredient))]
        public int IngredientId { get; set; }

        [Required]
        public Ingredient Ingredient { get; set; } = null!;
    }
}
