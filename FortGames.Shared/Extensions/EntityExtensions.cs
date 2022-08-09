using System.Linq.Expressions;

namespace FortGames.Shared.Extensions
{
    public static class EntityExtensions
    {
        public static IQueryable<T> Filter<T>(this IQueryable<T> query, Expression<Func<T, bool>> predicate = default)
        {
            return predicate != default ? query.Where(predicate) : query;
        }

        public static Expression<Func<T, object>> ToLambda<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T));
            var property = Expression.Property(parameter, propertyName);
            var propAsObject = Expression.Convert(property, typeof(object));
            return Expression.Lambda<Func<T, object>>(propAsObject, parameter);
        }
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string propertyName, string direction)
        {
            return (direction == "desc") ? source.OrderByDescending(ToLambda<T>(propertyName)) : source.OrderBy(ToLambda<T>(propertyName));
        }
    }
}
