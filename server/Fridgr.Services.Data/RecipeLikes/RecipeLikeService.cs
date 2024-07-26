﻿using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Data.Users;

namespace Fridgr.Services.Data.RecipeLikes
{
    public class RecipeLikeService : IRecipeLikeService
    {
        private readonly IRepository<RecipeLike> _recipeLikeRepository;
        private readonly IUserService _userService;

        public RecipeLikeService(IRepository<RecipeLike> recipeLikeRepository, IUserService userService)
        {
            _recipeLikeRepository = recipeLikeRepository;
            _userService = userService;
        }

        public async Task LikeRecipeAsync(int recipeId, string username)
        {
            string userId = await _userService.GetUserIdByUsernameAsync(username);

            await _recipeLikeRepository.AddAsync(new RecipeLike
            {
                UserId = userId,
                RecipeId = recipeId,
            });

            await _recipeLikeRepository.SaveChangesAsync();
        }

        public async Task<bool> UserLikedRecipeAsync(int recipeId, string username)
        {
            var userId = await _userService.GetUserIdByUsernameAsync(username);

            return _recipeLikeRepository.AllAsNoTracking()
                .Any(rl => rl.RecipeId == recipeId && rl.UserId == userId);
        }
    }
}
