using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using aspnetCoreReactTemplate.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace aspnetCoreReactTemplate.Controllers
{
    // [Authorize]
    [Route("api/Contacts")]
    public class ContactsController : Controller
    {
        DefaultDbContext _context;

        public ContactsController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET api/contacts
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _context.Contacts.OrderBy((o)=> o.lastName).Take(12);
        }

        // GET api/contacts/5
        [HttpGet("{id}", Name = "GetContact")]
        public Contact Get(int id)
        {
            return _context.Contacts.Find(id);
        }

        // GET api/contacts/?=
        [HttpGet("search")]
        public JsonResult Search(string q, int? pageSize, int? pageNumber, string orderRow, bool isAscending )
        {
            var query = _context.Contacts.AsQueryable();
            var OrderRow = orderRow ?? "";
            var Q = q ?? "";
            if (Q.Length > 0){
              query.Where((c)=> c.lastName.Contains(Q) || c.firstName.Contains(Q));
            };

            var total = query.Count();

            query = FilterTable(query, OrderRow, isAscending);

            int page = (pageNumber ?? 1) > 0 ? (pageNumber ?? 1) : 1;
            //page = page > 0 ? page : 1;
            int PageSize = pageSize ?? 12;

            return Json(new
            {
              contacts = query.Skip((page - 1) * (PageSize)).Take(PageSize),
              total = total
            });

            // return query.Take(pageSize ?? 12)
            // .Skip(PageNumber - 1);
        }

        public IQueryable<Contact> FilterTable(IQueryable<Contact> query, string OrderRow, bool isAscending) {
          switch (OrderRow) {
              case "firstName":
                if (isAscending)
                  return query.OrderBy((o) => o.firstName);
                else
                  return query.OrderByDescending((o) => o.firstName);
              case "lastName":
                if (isAscending)
                  return query.OrderBy((o) => o.lastName);
                else
                  return query.OrderByDescending((o) => o.lastName);
              case "phone":
                if (isAscending)
                  return query.OrderBy((o) => o.phone);
                else
                  return query.OrderByDescending((o) => o.phone);
              case "email":
                if (isAscending) {
                  return query.OrderBy((o) => o.email);
                }
                else {
                  return query.OrderByDescending((o) => o.email);
                }
              default:
              {
                if (isAscending)
                  return query.OrderBy((o) => o.contactId);
                else
                  return query.OrderByDescending((o) => o.contactId);
              }
            };
        }

        // POST api/contacts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Contact model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Contacts.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetContact", new { id = model.contactId }, model);
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Contact model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.contactId = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Contact contact = new Contact() { contactId = id };
            _context.Entry(contact).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
