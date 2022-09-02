using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FortGames.Shared.Extensions
{
    public static class DbExtensions
    {
        public static IEnumerable<T> DeltaList<T, TKey>(this IEnumerable<T> left, IEnumerable<T> right, Func<T, TKey> keyFunc) where T : class
        {
            var leftSet = left.ToList();
            var rightSet = right.ToList();

            var leftKeys = leftSet.Select(keyFunc);
            var rightKeys = rightSet.Select(keyFunc);

            var deltaKeys = leftKeys.Except(rightKeys);
            var deltaSet = leftSet.Where(i => deltaKeys.Contains(keyFunc.Invoke(i)));

            return deltaSet;
        }

        public static void UpdateManyToMany<T, TKey>(this ICollection<T> currentItems, IEnumerable<T> newItems, Func<T, TKey> keyFunc) where T : class
        {
            var removeList = currentItems.DeltaList(newItems, keyFunc);
            var addList = newItems.DeltaList(currentItems, keyFunc);

            foreach (var item in removeList)
            {
                currentItems.Remove(item);
            }

            foreach (var item in addList)
            {
                currentItems.Add(item);
            }
        }
    }
}
