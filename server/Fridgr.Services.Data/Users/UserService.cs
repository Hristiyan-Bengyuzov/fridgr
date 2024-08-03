using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Web.DTOs.Users;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Users
{
    public class UserService : IUserService
    {
        private readonly IRepository<ApplicationUser> _userRepository;

        public UserService(IRepository<ApplicationUser> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDetailsDTO> GetUserDetailsByUsernameAsync(string username)
        {
            var user = await _userRepository.AllAsNoTracking()
                .Include(u => u.Recipes)
                .Include(u => u.RecipeLikes)
                .Include(u => u.Reviews)
                .FirstAsync(u => u.UserName == username);

            return new UserDetailsDTO
            {
                Username = username,
                Image = user.ImageUrl,
                RecipesCount = user.Recipes.Count(),
                LikedRecipesCount = user.RecipeLikes.Count(),
                ReviewsCount = user.Reviews.Count(),
            };
        }

        public async Task<string> GetUserIdByUsernameAsync(string username)
        {
            var user = await _userRepository.AllAsNoTracking().FirstAsync(u => u.UserName == username);
            return user.Id;
        }

        public async Task<string> GetUserImageByUsernameAsync(string username)
        {
            var user = await _userRepository.AllAsNoTracking().FirstAsync(u => u.UserName == username);
            return user.ImageUrl!;
        }
    }
}
