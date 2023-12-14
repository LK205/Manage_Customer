using System;

namespace API.Services
{
    public class Age
    {
        public static long getAge(DateTime DayOfBirth)
        {
            long result = 0;
            DateTime CurrentDate = DateTime.Now;
            if (DayOfBirth >= CurrentDate)
            {
                result = CurrentDate.Year - DayOfBirth.Year ;
            }
            else
            {
                result = CurrentDate.Year - DayOfBirth.Year -  1;
            }
            return result;
        }
    }
}
