using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
    public class HASH
    {
        public static string ToSHA256(string str)
        {
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(str));
            var result = new StringBuilder();
            for(int i=0; i< bytes.Length; i++)
            {
                result.Append(bytes[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}
