using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Fridgr.Services.Data.Tokens
{
    public interface ITokenService
    {
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
        JwtSecurityToken GenerateJwt(string username);
        string GenerateRefreshToken();
    }
}
