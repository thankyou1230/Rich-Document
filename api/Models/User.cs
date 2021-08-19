using System;

namespace RichDocumentRestAPIs.Models
{
    public class User
    {
        public User(string firstName, string lastName, DateTime dateOfBirth, string email, string accessToken, bool acceptPrivacy)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.dateOfBirth = dateOfBirth;
            this.email = email;
            this.password = password;
            this.accessToken = accessToken;
            this.acceptPrivacy = acceptPrivacy;
        }

        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string accessToken { get; set; }
        public bool acceptPrivacy { get; set; }
    }
}