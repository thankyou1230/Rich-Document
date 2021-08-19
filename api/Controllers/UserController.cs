using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RichDocumentRestAPIs.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using Firebase.Auth;
using Google.Cloud.Firestore;
using System.Threading.Tasks;

namespace RichDocumentRestAPIs.Controllers
{
    [EnableCors("CorsPolicy")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        [HttpPost]
        [Route("LoginByAccount")]
        public async Task<IActionResult> LoginByAccount()
        {
            var email = Request.Form["email"];
            var password = Request.Form["password"];
            try
            {
                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(Program.firebase["apiKey"]));
                var authenticator = await authProvider.SignInWithEmailAndPasswordAsync(email, password);
                if (authenticator.FirebaseToken != "")
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                // Info
                return BadRequest(ex.Message);
            }
        }

        //Login by Google idToken
        [HttpPost]
        [Route("LoginByGoogle")]
        public async Task<IActionResult> LoginByGoogle()
        {
            var googleToken = Request.Form["token"];
            try
            {
                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(Program.firebase["apiKey"]));
                var authenticator = await authProvider.SignInWithOAuthAsync(FirebaseAuthType.Google, googleToken);
                if (authenticator.FirebaseToken != "")
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                // Info
                return BadRequest(ex.Message);
            }
        }

        //Sign up
        [HttpPost]
        [Route("SignUp")]
        public IActionResult SignUp()
        {
            var email = Request.Form["email"];
            var password = Request.Form["password"];
            var firstname = Request.Form["firstname"];
            var lastname = Request.Form["lastname"];
            var dateofbirth = Request.Form["dateofbirth"];
            try
            {
                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(Program.firebase["apiKey"]));
                var authenticator = authProvider.CreateUserWithEmailAndPasswordAsync(email, password, firstname + " " + lastname, false); // change to false: dont send verify email
                //Connect to Firestore Database
                string path = AppDomain.CurrentDomain.BaseDirectory + @"rich-document.json";
                Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
                FirestoreDb firestoreDb = FirestoreDb.Create(Program.firebase["projectId"]);
                // Add User information to Cloud Firebase
                DocumentReference documentReference = firestoreDb.Collection(Program.firebase["firestoreCollection"]).Document(email);
                Dictionary<string, object> user = new Dictionary<string, object>
                {
                    { "dateofbirth", dateofbirth },
                    { "email", email },
                    { "firstname", firstname },
                    { "lastname", lastname },
                    { "acceptprivacy", false }
                };
                documentReference.SetAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                // Info
                return BadRequest(ex.Message);
            }
        }

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}