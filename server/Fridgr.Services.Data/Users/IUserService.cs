namespace Fridgr.Services.Data.Users
{
    public interface IUserService
    {
        Task<string> GetUserIdByUsernameAsync(string username);
    }
}
