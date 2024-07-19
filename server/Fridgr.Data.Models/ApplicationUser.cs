﻿using Microsoft.AspNetCore.Identity;

namespace Fridgr.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() => this.Id = Guid.NewGuid().ToString();

        public string? ImageUrl { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}