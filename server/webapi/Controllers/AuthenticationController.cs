using Fridgr.Data.Models;
using Fridgr.Services.Data.Images;
using Fridgr.Services.Data.Tokens;
using Fridgr.Services.Mapping;
using Fridgr.Web.DTOs.Register;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(UserManager<ApplicationUser> userManager, ITokenService tokenService, ICloudinaryService cloudinaryService, ILogger<AuthenticationController> logger)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _cloudinaryService = cloudinaryService;
            _logger = logger;
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromForm] RegisterDTO model)
        {
            _logger.LogInformation("Register called");

            if (await _userManager.FindByNameAsync(model.Username) is not null)
                return Conflict("Another user is using this username.");

            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return Conflict("Another user is using this email.");

            var user = AutoMapperConfig.MapperInstance.Map<ApplicationUser>(model);
            user.ImageUrl = _cloudinaryService.UploadImage(model.Image);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                _logger.LogInformation("Register succeeded");
                return Ok("User successfully created");
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Failed to create user: {string.Join(" ", result.Errors.Select(e => e.Description))}");
        }
    }
}
