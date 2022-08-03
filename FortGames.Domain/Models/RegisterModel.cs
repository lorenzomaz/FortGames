using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FortGames.Domain.Models
{
    public class RegisterModel
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [JsonIgnore]
        public bool EmailConfirmed { get; set; } = true;

    }
}
