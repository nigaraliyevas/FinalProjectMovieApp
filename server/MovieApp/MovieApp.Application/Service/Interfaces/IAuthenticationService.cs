using MovieApp.Application.Dtos.UserDto;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IAuthenticationService
    {
        Task Register(UserRegisterDto userRegisterDto);
        Task<string> Login(UserLoginDto userLoginDto);
        Task CreateRole();
        Task<UserGetDto> GetUserProfile(string username);
        Task<string> GeneratePasswordResetToken(ForgetPasswordDto forgetPasswordDto);
        Task ResetPassword(RecoverPasswordDto recoverPasswordDto);
        Task<string> RemoveUser(string id);
    }
}
