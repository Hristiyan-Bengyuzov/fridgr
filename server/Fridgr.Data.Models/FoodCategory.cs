using System.ComponentModel.DataAnnotations;

namespace Fridgr.Data.Models
{
    public class FoodCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}
