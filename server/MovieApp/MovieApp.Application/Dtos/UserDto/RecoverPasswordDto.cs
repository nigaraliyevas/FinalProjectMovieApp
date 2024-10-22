namespace MovieApp.Application.Dtos.UserDto
{
    public class RecoverPasswordDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
