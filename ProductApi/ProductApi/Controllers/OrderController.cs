using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProductApi;

namespace ProductApi.Controllers
{
    public class OrderController : ApiController
    {
        private MarketingDbEntities db = new MarketingDbEntities();

        // GET api/Order
        public IQueryable<OrderTbl> GetOrderTbls()
        {
            return db.OrderTbls;
        }

        // GET api/Order/5
        [ResponseType(typeof(OrderTbl))]
        public IHttpActionResult GetOrderTbl(int id)
        {
            OrderTbl ordertbl = db.OrderTbls.Find(id);
            if (ordertbl == null)
            {
                return NotFound();
            }

            return Ok(ordertbl);
        }

        // PUT api/Order/5
        public IHttpActionResult PutOrderTbl(int id, OrderTbl ordertbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ordertbl.OrderId)
            {
                return BadRequest();
            }

            db.Entry(ordertbl).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderTblExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Order
        [ResponseType(typeof(OrderTbl))]
        public IHttpActionResult PostOrderTbl(OrderTbl ordertbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderTbls.Add(ordertbl);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ordertbl.OrderId }, ordertbl);
        }

        // DELETE api/Order/5
        [ResponseType(typeof(OrderTbl))]
        public IHttpActionResult DeleteOrderTbl(int id)
        {
            OrderTbl ordertbl = db.OrderTbls.Find(id);
            if (ordertbl == null)
            {
                return NotFound();
            }

            db.OrderTbls.Remove(ordertbl);
            db.SaveChanges();

            return Ok(ordertbl);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderTblExists(int id)
        {
            return db.OrderTbls.Count(e => e.OrderId == id) > 0;
        }
    }
}