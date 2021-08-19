using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace RichDocumentRestAPIs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        //Create configuration and section for getting values from appsettings.json file
        private static readonly IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        public static readonly IConfigurationSection amazonS3 = configuration.GetSection("AmazonS3");
        public static readonly IConfigurationSection firebase = configuration.GetSection("Firebase");
    }
}