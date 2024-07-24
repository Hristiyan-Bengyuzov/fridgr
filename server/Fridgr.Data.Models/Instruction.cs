using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fridgr.Data.Models
{
    public class Instruction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = null!;

        [ForeignKey(nameof(Recipe))]
        public int RecipeId { get; set; }

        [Required]
        public Recipe Recipe { get; set; } = null!;
    }
}
