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
    public class ProductController : ApiController
    {
        private MarketingDbEntities db = new MarketingDbEntities();

        // GET api/Product
        public IQueryable<ProductTbl> GetProductTbls()
        {
            return db.ProductTbls;
        }

        // GET api/Product/5
        [ResponseType(typeof(ProductTbl))]
        public IHttpActionResult GetProductTbl(int id)
        {
            ProductTbl producttbl = db.ProductTbls.Find(id);
            if (producttbl == null)
            {
                return NotFound();
            }

            return Ok(producttbl);
        }

        // PUT api/Product/5
        public IHttpActionResult PutProductTbl(int id, ProductTbl producttbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != producttbl.ProductId)
            {
                return BadRequest();
            }

            db.Entry(producttbl).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTblExists(id))
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

        // POST api/Product
        [ResponseType(typeof(ProductTbl))]
        public IHttpActionResult PostProductTbl(ProductTbl producttbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductTbls.Add(producttbl);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = producttbl.ProductId }, producttbl);
        }

        // DELETE api/Product/5
        [ResponseType(typeof(ProductTbl))]
        public IHttpActionResult DeleteProductTbl(int id)
        {
            ProductTbl producttbl = db.ProductTbls.Find(id);
            if (producttbl == null)
            {
                return NotFound();
            }

            db.ProductTbls.Remove(producttbl);
            db.SaveChanges();

            return Ok(producttbl);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductTblExists(int id)
        {
            return db.ProductTbls.Count(e => e.ProductId == id) > 0;
        }
    }
}