using System.Security.Claims;
using System.Security.Principal;

namespace FortGames.Shared.Extensions
{
    public static class UserExtensions
    {
        public static string GetUserId(this IPrincipal principal, string claimType = ClaimTypes.NameIdentifier)
        {
            var claimsIdentity = (ClaimsIdentity)principal.Identity!;
            var claim = claimsIdentity.FindFirst(claimType);
            return claim!.Value;
        }
    }
}

