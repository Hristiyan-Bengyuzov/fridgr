using AutoMapper;
using Fridgr.Data.Models;
using Fridgr.Services.Mapping;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using static Fridgr.Common.GlobalConstants;

namespace Fridgr.Web.DTOs.Register
{
    public class RegisterDTO : IMapTo<ApplicationUser>, IHaveCustomMappings
    {
        [Required]
        [MaxLength(UsernameMaxLength)]
        public string Username { get; set; } = null!;

        [Required]
        [MaxLength(EmailMaxLength)]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(PasswordMaxLength)]
        public string Password { get; set; } = null!;

        public IFormFile? Image { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<RegisterDTO, ApplicationUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username));
        }
    }
}
