using System.ComponentModel.DataAnnotations;

namespace FortGames.Shared.Extensions
{
    public static class StringExtensions
    {
        public static bool IsValidEmail(this string email) => email != null && new EmailAddressAttribute().IsValid(email);
    }
}