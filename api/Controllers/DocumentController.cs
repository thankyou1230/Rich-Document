using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RichDocumentRestAPIs.Data;
using RichDocumentRestAPIs.Models;

namespace RichDocumentRestAPIs.Controllers
{
    [EnableCors("CorsPolicy")]
    public class DocumentController : Controller
    {
        private readonly DocumentContext _context;

        public DocumentController(DocumentContext context)
        {
            _context = context;
        }

        //Get all documents infor by user email
        [HttpPost]
        [Route("GetAllDocumentsByEmail")]
        public IActionResult GetAllSigns()
        {
            var email = Request.Form["email"];
            var documents = _context.Document.ToList().Where(document => document.userEmail == email).OrderByDescending(document => document.lastModified);
            if (documents == null) return BadRequest();
            return Ok(documents);
        }

        //Receive file from client then upload to S3 storage
        [HttpPost]
        [Route("UploadFile")]
        public IActionResult UploadFile()
        {
            try
            {
                var request = HttpContext.Request;
                var email = Request.Form["email"];
                if (request.Form.Files.Count > 0)
                {
                    var fileName = request.Form.Files[0].FileName;
                    var extension = fileName.Substring(fileName.LastIndexOf(".")).ToLower();
                    //Check if file extension is valid and supported
                    if (ValidFileExtension(extension))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            request.Form.Files[0].CopyTo(memoryStream);
                            //Check if file size is not larger than 10MB
                            if (memoryStream.Length <= 10485760)
                            {
                                //Create a client to access S3 storage
                                var client = new Amazon.S3.AmazonS3Client(Program.amazonS3["accessKeyId"], Program.amazonS3["secretAccessKey"], Amazon.RegionEndpoint.APSoutheast1);
                                var transferUtility = new Amazon.S3.Transfer.TransferUtility(client);
                                var inputStream = new Amazon.S3.Transfer.TransferUtilityUploadRequest
                                {
                                    BucketName = Program.amazonS3["bucketName"],
                                    Key = email + "/" + fileName,
                                    InputStream = memoryStream,
                                    CannedACL = Amazon.S3.S3CannedACL.PublicRead
                                };
                                transferUtility.Upload(inputStream);
                                //Update database
                                var url = Program.amazonS3["defaultObjectUrl"] + email + "/" + fileName;
                                var fileType = DefineFileType(extension);
                                var byteSize = request.Form.Files[0].Length;
                                UpdateDatabase(fileName, fileType, byteSize, url, email);
                                return Ok("Upload succeeded");
                            }
                        }
                    }
                }
                return BadRequest();
            }
            catch (Exception exception)
            {
                return BadRequest(exception.InnerException.Message);
            }
        }

        //Define file type 
        //Input <--- file's extension
        //Output ---> type: string
        public string DefineFileType(string fileExtension)
        {
            if (fileExtension == ".docx" || fileExtension == ".pdf" || fileExtension == ".txt")
            {
                return "document";
            }
            else if (fileExtension == ".wav" || fileExtension == ".mp3")
            {
                return "audio";
            }
            else if (fileExtension == ".mp4" || fileExtension == ".avi" || fileExtension == ".wmv")
            {
                return "video";
            }
            else if (fileExtension == ".png" || fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".bmp")
            {
                return "image";
            }
            else
            {
                return "undefined";
            }
        }

        //Update document's references database
        public void UpdateDatabase(string fileName, string fileType, long byteSize, string url, string userEmail)
        {
            //Check if the same record existed
            var document = _context.Document.ToList().Where(d => d.fileName == fileName && d.userEmail == userEmail).FirstOrDefault();
            if (document != null)
            {
                //Update record with new references
                document.byteSize = byteSize;
                document.fileType = fileType;
                document.url = url;
                document.lastModified = DateTime.Now;
                _context.Document.Update(document);
            }
            else
            {
                //Declare new record of document
                document = new Document(fileName, fileType, DateTime.Now, byteSize, url, userEmail);
                _context.Document.Add(document);
            }
            _context.SaveChanges();
        }

        //Check if file extension is valid
        public bool ValidFileExtension(string extension)
        {
            string[] extensions = { ".docx", ".pdf", ".txt", ".mp3", ".wav", ".mp4", ".avi", ".wmv", ".png", ".jpg", ".jpeg", ".bmp" };
            if (extensions.Contains(extension) && !string.IsNullOrEmpty(extension))
            {
                return true;
            }
            return false;
        }

        public void DeleteConfirmed(int id)
        {
            var document = _context.Document.Find(id);
            _context.Document.Remove(document);
            _context.SaveChanges();
        }

        // POST: Delete document from cloud and db
        [HttpPost]
        [Route("DeleteFile")]
        public IActionResult DeleteFile()
        {
            var id = int.Parse(Request.Form["id"]);
            var email = Request.Form["email"];
            var fileName = Request.Form["fileName"];
            try
            {
                var client = new Amazon.S3.AmazonS3Client(Program.amazonS3["accessKeyId"], Program.amazonS3["secretAccessKey"], Amazon.RegionEndpoint.APSoutheast1);
                var transferUtility = new Amazon.S3.Transfer.TransferUtility(client);
                var deleteObjectRequest = new Amazon.S3.Model.DeleteObjectRequest
                {
                    BucketName = Program.amazonS3["bucketName"],
                    Key = email + "/" + fileName
                };
                //Delete from S3
                client.DeleteObjectAsync(deleteObjectRequest);
                //Update database
                DeleteConfirmed(id);
                //Response sucess
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // GET: Document/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Document/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,fileName,fileType,lastModified,byteSize,url,userEmail")] Document document)
        {
            if (ModelState.IsValid)
            {
                _context.Add(document);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(document);
        }

        // GET: Document/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var document = await _context.Document.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }
            return View(document);
        }

        // POST: Document/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,fileName,fileType,lastModified,byteSize,url,userEmail")] Document document)
        {
            if (id != document.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(document);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DocumentExists(document.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(document);
        }

        private bool DocumentExists(int id)
        {
            return _context.Document.Any(e => e.id == id);
        }

    }
}