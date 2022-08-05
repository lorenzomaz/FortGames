using System.ComponentModel.DataAnnotations;

namespace FortGames.Domain.Models
{
    public class ResetUserPasswordModel
    {
        public string Id { get; set; }

        [DataType(DataType.Password)]
        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Required]
        [MinLength(6)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
