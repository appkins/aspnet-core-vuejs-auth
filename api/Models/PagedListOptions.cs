namespace aspnetCoreReactTemplate.Models
{
    public class PagedListOptions
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString {get; set; }

        public bool Decending { get; set; }

        public string SortProperty { get; set; }
    }
}
