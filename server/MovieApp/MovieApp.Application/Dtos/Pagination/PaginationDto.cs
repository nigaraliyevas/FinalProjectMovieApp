using Microsoft.EntityFrameworkCore;

namespace MovieApp.Application.Dtos.Pagination
{
    public class PaginationDto<T> : List<T>
    {
        public PaginationDto(List<T> items, int currentPage, int totalPage)
        {
            CurrentPage = currentPage;
            TotalPage = totalPage;
            this.AddRange(items);
        }
        public int CurrentPage { get; }
        public int TotalPage { get; }
        public bool HasNext => CurrentPage < TotalPage;
        public bool HasPrev => CurrentPage > 1;
        public static async Task<PaginationDto<T>> Create(IQueryable<T> query, int page, int take)
        {
            var datas = await query
                .Skip((page - 1) * take)
                .Take(take)
                .ToListAsync();
            var totalPage = (int)Math.Ceiling((decimal)query.Count() / take);
            return new PaginationDto<T>(datas, page, totalPage);
        }
    }
}
