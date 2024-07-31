using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Fridgr.Data.Models
{

    [PrimaryKey(nameof(RecipeId), nameof(UserId))]
    public class Review
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

        [Required]
        public string Text { get; set; } = null!;

        public int Stars { get; set; }
    }
}
