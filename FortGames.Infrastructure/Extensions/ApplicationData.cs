using FortGames.Domain.Entities;
using FortGames.Shared.Constats;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FortGames.Infrastructure.Extensions
{
    public static class ApplicationData
    {
        public static void Seed(this ModelBuilder builder) //this -> estensione
        {
            #region Admin
            //ruolo, id admin e password
            var roleId = Guid.NewGuid().ToString();
            var adminId = Guid.NewGuid().ToString();
            var passwordHasher = new PasswordHasher<ApplicationUser>();
            var roleName = Identity.Roles.Admin;
            var userName = "admin@fortgames.net";
            var password = "lorenzo.123";

            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = roleId,
                Name = roleName,
                NormalizedName = roleName.ToUpper()
            });

            var admin = new ApplicationUser
            {
                Id = adminId,
                UserName = userName,
                NormalizedUserName = userName.ToUpper(),
                Email = userName,
                NormalizedEmail = userName.ToUpper(),
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D") //D sta per decimal, formatta con decimali
            };

            admin.PasswordHash = passwordHasher.HashPassword(admin, password);

            builder.Entity<ApplicationUser>().HasData(admin);

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = roleId, UserId = adminId });

            #endregion

            #region Roles

            var roles = new[] { Identity.Roles.User, Identity.Roles.Guest }; //inline Init
            foreach (var item in roles)
            {
                builder.Entity<IdentityRole>().HasData(new IdentityRole
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = item,
                    NormalizedName = item.ToUpper()
                });
            }

            #endregion
        }
    }
}
