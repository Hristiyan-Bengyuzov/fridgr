using Fridgr.Services.Data.Users;
using Fridgr.Web.DTOs.Users;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getUserDetails/{username}")]
        public async Task<ActionResult<UserDetailsDTO>> GetUserDetails(string username)
        {
            var userDetails = await _userService.GetUserDetailsByUsernameAsync(username);
            return Ok(userDetails);
        }
    }
}
