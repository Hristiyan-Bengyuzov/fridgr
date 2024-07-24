using System.ComponentModel.DataAnnotations;

namespace Fridgr.Data.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string? Image { get; set; }

        public ICollection<Instruction> Instructions { get; set; } = new HashSet<Instruction>();
        public ICollection<RecipeIngredient> Ingredients { get; set; } = new HashSet<RecipeIngredient>();
    }
}
