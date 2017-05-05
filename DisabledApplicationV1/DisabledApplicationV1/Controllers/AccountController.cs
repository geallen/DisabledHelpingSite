using DisabledApplicationV1.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace DisabledApplicationV1.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult RegisterOperations(string name, string surname, string username, string password, int userType, string story)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            var result1 = new List<object>();
            List<string> abc = new List<string>();
            SqlDataReader rdr1 = null;
            try
            {
                dbCon.Open();

                var command1 = new SqlCommand("[dbo].[CheckUserList]", dbCon);
                command1.CommandType = CommandType.StoredProcedure;
                command1.CommandTimeout = 30;
                command1.Connection = dbCon;

                rdr1 = command1.ExecuteReader();


                if (rdr1.HasRows)
                {
                    while (rdr1.Read())
                    {
                        abc.Add(rdr1[0].ToString());
                    }
                }

                for (int i = 0; i < abc.Count(); i++)
                {
                    if (abc[i] == username)
                    {
                        // return new JavaScriptSerializer().Serialize(new { Status = false, StatusCode = "War101" });
                        return Json("Error");
                    }
                }
                if (rdr1 != null)
                {
                    rdr1.Close();
                }
                var command = new SqlCommand("[dbo].[RegisterOperation]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Name", SqlDbType.NVarChar).Value = name;
                command.Parameters.Add("@Surname", SqlDbType.NVarChar).Value = surname;
                command.Parameters.Add("@Username", SqlDbType.NVarChar).Value = username;
                command.Parameters.Add("@Password", SqlDbType.NVarChar).Value = password;
                command.Parameters.Add("@UserType", SqlDbType.Int).Value = userType;
                command.Parameters.Add("@Story", SqlDbType.NVarChar).Value = story;

                command.CommandTimeout = 120;
                command.Connection = dbCon;
                command.ExecuteNonQuery();
                return Json("You succesfully registered to system");
            }
            catch (Exception ex)
            {
                return Json("You did not succesfully registered to system");
            }
            finally
            {

                dbCon.Close();
            }
        }
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public string LoginOperations(string username, string password, int usertype)
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var dt = new DataTable();
            var result = new List<object>();
            var result2 = new List<object>();

            SqlCommand command = new SqlCommand();

            SqlDataReader rdr = null;
            string dizi = string.Empty;
            try
            {
                dbCon.Open();
                command = new SqlCommand("[dbo].[LoginOperation]", dbCon);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add("@Username", SqlDbType.NVarChar, 50).Value = username;
                command.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = password;
                command.Parameters.Add("@UserType", SqlDbType.Int).Value = usertype;

                command.CommandTimeout = 30;
                command.Connection = dbCon;

                rdr = command.ExecuteReader();


                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>() {

                            rdr[0].ToString(), // id
                            rdr[1].ToString(), // name
                            rdr[2].ToString(), // surname
                            rdr[3].ToString(), // username
                            rdr[4].ToString(), // password
                            rdr[5].ToString(), // usertype
                            rdr[6].ToString(), // story
                            Convert.ToInt32(rdr[7].ToString()) // remove count
                            }
                        );


                        Member member = new Member();
                        member.userId = Convert.ToInt32(rdr[0].ToString());
                        member.name = rdr[1].ToString();
                        member.surname = rdr[2].ToString();
                        member.username = rdr[3].ToString();
                        member.usertype = Convert.ToInt32(rdr[5]);
                        member.story = rdr[6].ToString();

                        Session["User"] = member;
                        Session["Username"] = member.username;
                    }

                    return (new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue }).Serialize(new { Status = true, StatusCode = "OK", MessageList = result.ToArray() });

                }
                else
                {
                    return new JavaScriptSerializer().Serialize(new { Status = false, StatusCode = "War101" });
                }

            }
            catch (Exception ex)
            {

                return new JavaScriptSerializer().Serialize(new { Status = false, StatusCode = ex.Message.ToString() });
            }
            finally
            {
                if (rdr != null)
                {
                    rdr.Close();
                }
                dbCon.Close();
            }

        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Login", "Account");
        }
    }
}