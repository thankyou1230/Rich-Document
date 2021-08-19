using System;
using System.ComponentModel.DataAnnotations;

namespace RichDocumentRestAPIs.Models
{
    public class Document
    {
        public Document(string fileName, string fileType, DateTime lastModified, long byteSize, string url, string userEmail)
        {
            this.fileName = fileName;
            this.fileType = fileType;
            this.lastModified = lastModified;
            this.byteSize = byteSize;
            this.url = url;
            this.userEmail = userEmail;
        }

        [Key]
        public int id { get; set; }
        public string fileName { get; set; }
        public string fileType { get; set; }
        public DateTime lastModified { get; set; }
        public long byteSize { get; set; }
        public string url { get; set; }
        public string userEmail { get; set; }
    }
}