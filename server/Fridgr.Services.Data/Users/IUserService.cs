using Fridgr.Web.DTOs.Users;

namespace Fridgr.Services.Data.Users
{
    public interface IUserService
    {
        Task<string> GetUserIdByUsernameAsync(string username);
        Task<string> GetUserImageByUsernameAsync(string username);
        Task<UserDetailsDTO> GetUserDetailsByUsernameAsync(string username);
    }
}
