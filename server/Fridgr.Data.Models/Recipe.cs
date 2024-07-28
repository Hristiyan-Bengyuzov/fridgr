using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fridgr.Data.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string? Image { get; set; }

        [ForeignKey(nameof(User))]
        public string? UserId { get; set; }

        public ApplicationUser? User { get; set; }

        public ICollection<Instruction> Instructions { get; set; } = new HashSet<Instruction>();
        public ICollection<RecipeIngredient> Ingredients { get; set; } = new HashSet<RecipeIngredient>();
    }
}
