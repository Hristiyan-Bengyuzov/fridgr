using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fridgr.Data.Models
{
    [PrimaryKey(nameof(RecipeId), nameof(UserId))]
    public class RecipeLike
    {
        [ForeignKey(nameof(Recipe))]
        public int RecipeId { get; set; }

        [Required]
        public Recipe Recipe { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;

        [Required]
        public ApplicationUser User { get; set; } = null!;
    }
}
