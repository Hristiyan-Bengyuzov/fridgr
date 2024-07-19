using Microsoft.AspNetCore.Http;

namespace Fridgr.Services.Data.Images
{
    public interface ICloudinaryService
    {
        string? UploadImage(IFormFile? file);
    }
}
