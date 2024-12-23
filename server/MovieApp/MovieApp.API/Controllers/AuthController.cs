﻿using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.PaymentDtos;
using MovieApp.Application.Dtos.UserDto;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        private readonly IPaymentService _paymentService;

        public AuthController(IAuthenticationService authService, IPaymentService paymentService)
        {
            _authService = authService;
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto, int? planId)
        {
            await _authService.Register(userRegisterDto, planId);
            return StatusCode(201);
        }

        [HttpPost("Role")]
        public async Task<IActionResult> CreateRole()
        {
            await _authService.CreateRole();
            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var token = await _authService.Login(userLoginDto);
            return Ok(new { token });
        }

        [HttpGet("Profile")]
        //[Authorize]
        public async Task<IActionResult> UserProfile(string userName)
        {
            var userProfile = await _authService.GetUserProfile(userName);
            return Ok(userProfile);
        }

        //[HttpPost("ForgetPassword")]
        //public async Task<IActionResult> ForgetPassword(ForgetPasswordDto forgetPasswordDto)
        //{
        //    var token = await _authService.GeneratePasswordResetToken(forgetPasswordDto);
        //    return Ok(new { message = "Password reset token has been sent to your email" });
        //}

        //[HttpPost("RecoverPassword")]
        //public async Task<IActionResult> RecoverPassword(RecoverPasswordDto recoverPasswordDto)
        //{
        //    await _authService.ResetPassword(recoverPasswordDto);
        //    return Ok(new { message = "Password has been reset successfully" });
        //}
        [HttpDelete("id")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return Ok(await _authService.RemoveUser(id));
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] PaymentCreateDto paymentCreateDto)
        {
            if (string.IsNullOrWhiteSpace(paymentCreateDto.Email))
            {
                return BadRequest("Email cannot be empty.");
            }

            var sessionId = await _paymentService.CreateCheckoutSessionAsync(paymentCreateDto);
            return Ok(new { sessionId });
        }

        [HttpPost("payment-success")]
        public async Task<IActionResult> PaymentSuccess([FromBody] PaymentSuccessDto paymentSuccessDto)
        {
            await _paymentService.HandlePaymentSuccessAsync(paymentSuccessDto);
            return Ok();
        }
        [
        HttpPost("watch-movie/{name}")]
        public async Task<IActionResult> WatchMovie(string name)
        {
            await _authService.WatchMovie(name);
            return Ok();
        }
    }
}
