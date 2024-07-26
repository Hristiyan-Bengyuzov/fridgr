using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
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
