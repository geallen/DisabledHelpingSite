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
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MyList()
        {
            return View();
        }
        public ActionResult HomeForHelper()
        {
            return View();
        }

        public ActionResult HomePageForDisabled()
        {
            return View();
        }
        [HttpPost]
        public string ShowMyList()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlCommand command2 = new SqlCommand();
            SqlDataReader rdr = null;

            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[ShowList]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.Add("@UserTypeId", SqlDbType.Int).Value = userTypeId;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()),
                            rdr[1].ToString(),
                            rdr[2].ToString(),
                            rdr[3].ToString(),
                            Convert.ToInt32(rdr[4].ToString()),
                            Convert.ToInt32(rdr[5].ToString()),
                            Convert.ToInt32(rdr[6].ToString()),
                        });
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
        [HttpPost]
        public string HomePage()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlCommand command2 = new SqlCommand();
            SqlDataReader rdr = null;
            SqlDataReader rdr2 = null;

            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[PostDetailsOnly]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@UserTypeId", SqlDbType.Int).Value = userTypeId;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()),
                            rdr[1].ToString(),
                            rdr[2].ToString(),
                            rdr[3].ToString(),
                            Convert.ToInt32(rdr[4].ToString()),
                            Convert.ToInt32(rdr[5].ToString()),
                            Convert.ToInt32(rdr[6].ToString()),
                        });
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

        [HttpPost]
        public string GetComments(int postId)
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlDataReader rdr = null;


            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[GetCommentsOnly]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;
                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            rdr[0].ToString(),
                            rdr[1].ToString(), // comment
                            rdr[2].ToString() // comment owner user name

                        });
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

        [HttpPost]
        public ActionResult InsertComment(int postId, string comment)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            try
            {
                dbCon.Open();

                Member member = (Member)Session["User"];
                var userId = member.userId;
                var command = new SqlCommand("[dbo].[InsertComment]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Comment", SqlDbType.NVarChar).Value = comment;
                command.Parameters.Add("@WriterId", SqlDbType.Int).Value = userId;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;

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
        [HttpPost]
        public ActionResult RemoveMyList(int postId, int userId)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            try
            {
                dbCon.Open();

                var command = new SqlCommand("[dbo].[RemoveFromList]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@UserId", SqlDbType.NVarChar).Value = userId;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;

                command.CommandTimeout = 120;
                command.Connection = dbCon;
                command.ExecuteNonQuery();
                return Json("Removed");
            }
            catch (Exception ex)
            {
                return Json("Error when removing");
            }
            finally
            {

                dbCon.Close();
            }
        }

        [HttpPost]
        public string HomePageForDisabledMethod()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlDataReader rdr = null;


            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[PostDetails]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@UserTypeId", SqlDbType.Int).Value = userTypeId;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()),// post id
                            rdr[1].ToString(), // story
                            rdr[2].ToString(), // post date
                            rdr[3].ToString(), //comment date
                            rdr[4].ToString(), // comment
                            rdr[5].ToString(), // post owner name
                            rdr[6].ToString(), // comment owner name
                        });
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
        [HttpPost]
        public ActionResult Report(int postId)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            try
            {
                dbCon.Open();

                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                var command = new SqlCommand("[dbo].[ReportPost]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;

                command.CommandTimeout = 120;
                command.Connection = dbCon;
                command.ExecuteNonQuery();
                return Json("Report recorded.");
            }
            catch (Exception ex)
            {
                return Json("Report not recorded.");
            }
            finally
            {

                dbCon.Close();
            }
        }

        public ActionResult MarkPost(int postId)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            try
            {
                dbCon.Open();

                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                var command = new SqlCommand("[dbo].[MarkPostAsHelped]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;

                command.CommandTimeout = 120;
                command.Connection = dbCon;
                command.ExecuteNonQuery();
                return Json("Marking is done.");
            }
            catch (Exception ex)
            {
                return Json("Marking is not done.");
            }
            finally
            {

                dbCon.Close();
            }
        }

        [HttpPost]
        public string UnclickableAddList()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlDataReader rdr = null;


            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[GetAllAddedPosts]", dbCon);
                command.CommandType = CommandType.StoredProcedure;

                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()), //  id
                            Convert.ToInt32(rdr[1].ToString()), // adder id
                            Convert.ToInt32(rdr[3].ToString()), // post id
                            rdr[2].ToString() // adding date

                        });
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

        [HttpPost]
        public string UnclickableReportButton()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlDataReader rdr = null;


            try
            {
                dbCon.Open();


                Member member = (Member)Session["User"];
                int userTypeId = member.usertype;
                int userId = member.userId;

                command = new SqlCommand("[dbo].[GetAllReportedPosts]", dbCon);
                command.CommandType = CommandType.StoredProcedure;

                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()), // report id
                            Convert.ToInt32(rdr[1].ToString()), // report owner id
                            Convert.ToInt32(rdr[2].ToString()), // reported post id
                            rdr[3].ToString() // report date

                        });
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

        [HttpPost]
        public string UnclickableHelpButton()
        {
            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            SqlCommand command = new SqlCommand();
            SqlDataReader rdr = null;


            try
            {
                dbCon.Open();
                command = new SqlCommand("[dbo].[GetAllMarkedPosts]", dbCon);
                command.CommandType = CommandType.StoredProcedure;

                command.CommandTimeout = 30;
                rdr = command.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        result.Add(new List<object>()
                        {
                            Convert.ToInt32(rdr[0].ToString()), // mark id
                            Convert.ToInt32(rdr[1].ToString()), // mark owner id
                            Convert.ToInt32(rdr[2].ToString()), // marked post id
                            rdr[3].ToString() // mark date

                        });
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

        [HttpPost]
        public ActionResult AddMyList(int postId)
        {

            var dbCon = (new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DisabledDB"].ConnectionString));
            var result = new List<object>();
            try
            {
                dbCon.Open();

                Member member = (Member)Session["User"];
                var userId = member.userId;
                var command = new SqlCommand("[dbo].[AddMyList]", dbCon);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@AdderUserId", SqlDbType.Int).Value = userId;
                command.Parameters.Add("@PostId", SqlDbType.Int).Value = postId;

                command.CommandTimeout = 120;
                command.Connection = dbCon;
                command.ExecuteNonQuery();
                return Json("You succesfully added");
            }
            catch (Exception ex)
            {
                return Json("You did not succesfully added");
            }
            finally
            {

                dbCon.Close();
            }
        }

    }
}