using Fridgr.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Data
{
    public class FridgrDbContext : IdentityDbContext<ApplicationUser>
    {
        public FridgrDbContext(DbContextOptions<FridgrDbContext> options) : base(options) { }
    }
}
