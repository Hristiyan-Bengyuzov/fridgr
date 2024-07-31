﻿using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Data.Users;
using Fridgr.Web.DTOs.Reviews;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Reviews
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository<Review> _reviewRepository;
        private readonly IUserService _userService;

        public ReviewService(IRepository<Review> reviewRepository, IUserService userService)
        {
            _reviewRepository = reviewRepository;
            _userService = userService;
        }

        public async Task CreateReviewAsync(CreateReviewDTO createReviewDTO)
        {
            await _reviewRepository.AddAsync(new Review
            {
                RecipeId = createReviewDTO.RecipeId,
                UserId = await _userService.GetUserIdByUsernameAsync(createReviewDTO.Username),
                Text = createReviewDTO.Text,
                Stars = createReviewDTO.Stars,
            });

            await _reviewRepository.SaveChangesAsync();
        }

        public async Task<bool> UserReviewedRecipeAsync(int recipeId, string username)
        {
            string userId = await _userService.GetUserIdByUsernameAsync(username);

            return await _reviewRepository.AllAsNoTracking()
                .AnyAsync(r => r.RecipeId == recipeId && r.UserId == userId);
        }
    }
}