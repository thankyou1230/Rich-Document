using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RichDocumentRestAPIs.Models;

namespace RichDocumentRestAPIs.Data
{
    public class DocumentContext : DbContext
    {
        public DocumentContext (DbContextOptions<DocumentContext> options)
            : base(options)
        {
        }

        public DbSet<RichDocumentRestAPIs.Models.Document> Document { get; set; }
    }
}
