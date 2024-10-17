import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, SITE_URL } from "./apiConfig";

let api_token = "";

class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = `${API_URL}`;
  }

  init = (type) => {
    // Get token
    api_token = Cookies.get("refreshToken");

    let headers;
    if (type === "multipart/form-data") {
      headers = {
        "Content-Type": "multipart/form-data",
      };
    } else {
      headers = {
        Accept: "application/json",
      };
    }

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    this.client.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${api_token}`;
        return config;
      },
      (error) => {
        throw error;
      }
    );

    return this.client;
  };

  // --------

  registration = (data) => {
    return this.init().post("/interested-register", data);
  };

  login = (data) => {
    return this.init().post("/login", data);
  };

  isClubCoach = () => {
    return this.init().get("/isClubCoach");
  };

  forgotPasswordOTP = (data) => {
    return this.init().post("/clubUserFPO", data);
  };

  verifyForgotPasswordOTP = (data) => {
    return this.init().post("/verifyClubUserFPO", data);
  };

  clientRegister = (data, mode, coachId = "") => {
    return this.init("multipart/form-data").post(
      `/clientRegister?mode=${mode}&id=${coachId}`,
      data
    );
  };

  getAllFeeds = (type, page = "1", limit = "10") => {
    return this.init().get(
      `/app/feeds?person=club-coach&type=${type}&limit=${limit}&page=${page}`
    );
  };

  getMyPosts = (page = "1", limit = "1000000") => {
    return this.init().get(
      `/app/my-posts?person=club-coach&limit=${limit}&page=${page}`
    );
  };

  changeFeedActivity = (data) => {
    return this.init().post("/app/feedActivity", data);
  };

  uploadFeed = (data) => {
    return this.init("multipart/form-data").post("/app/addfeed", data);
  };

  addAppClient = (data) => {
    return this.init("multipart/form-data").post(`/app/createClient`, data);
  };

  getDashData = () => {
    return this.init().get("/dashboard");
  };

  getAllClients = (search = "") => {
    return this.init().get(`/allClient?limit=500&search=${search}`);
  };

  getMeetings = (date = "", meetingType = "") => {
    return this.init().get(
      `/allMeeting?date=${date}&meetingType=${meetingType}`
    );
  };

  loadComments = (postId) => {
    return this.init().get(
      `/app/get-comments?person=club-coach&postId=${postId}`
    );
  };

  sendOtpToConnectClub = (data) => {
    return this.init().post("/sendOtpToConnectCLub", data);
  };

  verifyOtpToConnectClub = (data) => {
    return this.init().post("/verifyOtpToConnectClub", data);
  };

  addDailyGoal = (data) => {
    return this.init().post("/app/add-daily-goal", data);
  };

  getCouchHomeData = () => {
    return this.init().get("/app/coachHome?person=club-coach");
  };

  getRevenueData = () => {
    return this.init().get("/app/coach-retail?person=club-coach");
  };

  getAllAppClients = () => {
    return this.init().get(`/app/allClient?person=club-coach`);
  };

  getAppClientDetails = (clientId) => {
    return this.init().get(
      `/app/clientProfile?person=club-coach&id=${clientId}`
    );
  };

  getClientMealPlans = (clientId) => {
    return this.init().get(
      `/app/get-plan-by-id?person=club-coach&clientId=${clientId}`
    );
  };

  getClientOrdersHistory = (clientId) => {
    return this.init().get(
      `/app/client-order-history?person=club-coach&clientId=${clientId}`
    );
  };

  getClientDetails = (clientId) => {
    return this.init().get(`/client/${clientId}`);
  };

  deleteClient = (clientId) => {
    return this.init().delete(`/deleteClient/${clientId}`);
  };

  registerClientManual = (data, mode) => {
    return this.init("multipart/form-data").post(
      `/clientRegister?mode=${mode}`,
      data
    );
  };

  getMeal = (search) => {
    return this.init().get(`/app/getMeal?query=${search}`);
  };

  addMeal = (data) => {
    return this.init("multipart/form-data").post("/app/add-meal", data);
  };

  createMealPlan = (data) => {
    return this.init().post("/app/create-plan", data);
  };

  getMealKits = () => {
    return this.init().get("/app/plans?person=club-coach");
  };

  getMealsById = (id) => {
    return this.init().get(`/app/get-plan-by-id/?id=${id}&person=club-coach`);
  };

  getClients = () => {
    return this.init().get("/app/allClient?person=club-coach");
  };

  assignMeal = (data) => {
    return this.init().post("/app/assign-plan", data);
  };

  uploadImage = (data) => {
    return this.init("multipart/form-data").get("/app/getPlanImage", data);
  };

  uploadFile = (data) => {
    return this.init("multipart/form-data").post("/app/uploadFile", data);
  };

  registerClientForm = (data, mode, coachId) => {
    return this.init("multipart/form-data").post(
      `/clientRegister?mode=${mode}&id=${coachId}`,
      data
    );
  };

  generateLink = (data) => {
    return this.init().post("/generateCustomLink", data);
  };

  getSubscriptionInfoClient = (id) => {
    return this.init().get(`/getSubscription/${id}`);
  };

  editClientGoal = (clientId, data) => {
    return this.init().put(
      `/app/editGoal?person=club-coach&id=${clientId}`,
      data
    );
  };

  addFollowUp = (clientId, data) => {
    const { followUpDate, ...healthMatrix } = data;
    return this.init().post(
      `/app/add-followup?person=club-coach&clientId=${clientId}`,
      {
        nextFollowUpDate: followUpDate,
        healthMatrix,
      }
    );
  };

  registerCoach = (data) => {
    return this.init().post("/registerCoach", data);
  };

  verifyRegisterOtp = (data) => {
    return this.init().post("/verify-register-otp", data);
  };

  getBrandProducts = (brandId) => {
    return this.init().get(`/app/getProductByBrand/${brandId}`);
  };

  placeOrder = (data) => {
    return this.init().post("/app/addClientOrder", data);
  };

  updateOrder = (data, id) => {
    return this.init().put(
      `/app/update-order?id=${id}&person=club-coach`,
      data
    );
  };

  getNotifications = () => {
    return this.init().get("/notification");
  };

  verifyClient = (link, rollno) => {
    return this.init().post(
      `/verifyClientMeeting?wellnessZLink=${SITE_URL}/meet/${link}`,
      { rollno }
    );
  };

  updateClient = (data, id) => {
    return this.init("multipart/form-data").put(`/updateClient/${id}`, data);
  };

  updateClubClientStatus = (clientId, activeStatus) => {
    return this.init().put(
      `/updateClubClientStatus?id=${clientId}&status=${activeStatus}`
    );
  };

  updateAppClientStatus = (clientId, activeStatus) => {
    return this.init().put(
      `/app/updateClientActiveStatus?id=${clientId}&status=${activeStatus}`
    );
  };

  sendNotification = (data) => {
    return this.init().post("/app/send-notification?person=club-coach", data);
  };

  getCoachProfile = () => {
    return this.init().get("/app/coachProfile?person=club-coach");
  };

  updateCoachProfile = (data) => {
    return this.init("multipart/form-data").post(
      "/app/updateCoachProfile?person=club-coach",
      data
    );
  };

  updateCoachPersonalDetails = (data) => {
    return this.init("multipart/form-data").put(
      `app/updateCoach?person=club-coach`,
      data
    );
  };

  requestReview = () => {
    return this.init().post("/app/requestReview?person=club-coach");
  };

  addReminder = (data) => {
    return this.init().post(
      "/app/addReminder?person=coach&uploadedBy=club-coach",
      data
    );
  };

  getReminders = () => {
    return this.init().get(
      "/app/getAllReminder?person=coach&uploadedBy=club-coach"
    );
  };

  updateReminder = (id, data) => {
    return this.init().put(
      `/app/update-reminder?person=coach&uploadedBy=club-coach&id=${id}`,
      data
    );
  };

  createRazorpayOrder = (data) => {
    return this.init().post(`/app/razorpay/createOrder`, data);
  };

  addClubSubscription = (data) => {
    return this.init().post(`/addSubscription`, data);
  };

  getNotes = () => {
    return this.init().get("/app/notes?person=coach&uploadedBy=club-coach");
  };

  addNote = (data) => {
    return this.init().post(
      "/app/notes?person=coach&uploadedBy=club-coach",
      data
    );
  };

  updateNote = (id, data) => {
    return this.init().put(
      `/app/notes?person=coach&uploadedBy=club-coach&id=${id}`,
      data
    );
  };

  deleteNote = (id) => {
    return this.init().delete(`/app/notes?person=club-coach&id=${id}`);
  };

  updateNotification = (id) => {
    return this.init().put(`/update-notification`, { data: id });
  };

  getAllClubSubscriptions = () => {
    return this.init().get("/getAllClubSubscriptions");
  };

  getOrdersHistory = () => {
    return this.init().get("/app/order-history?person=club-coach");
  };

  updateGoalCompletion = (data) => {
    return this.init().put("/app/edit-daily-goal?person=club-coach", data);
  };

  getMeetingDetails = (meetingLink) => {
    return this.init().get(`/getMeetingDetails?meetingLink=${meetingLink}`);
  };

  getVolumePoints = (id) => {
    return this.init().get(`/getClientVP?clientId=${id}`);
  };

  getReqVpByClients = () => {
    return this.init().get(`/getReqVpByClients`);
  };

  acceptRejectVP = (vpId, coachId, status = 1) => {
    return this.init().get(
      `/acceptRejectVP?vpId=${vpId}&coachId=${coachId}&status=${status}`
    );
  };

  acceptRejectVpPost = (data) => {
    return this.init().post(`/acceptRejectVpPost`, data);
  };

  addPoints = (data) => {
    return this.init().post(`/addVolumePoints`, data);
  };

  placeVolumePointOrder = (endpoint, data) => {
    return this.init().post(endpoint || "/add-vp-order", data);
  };

  clubClientsWithVP = () => {
    return this.init().get("/clubClientsWithVP");
  };

  sendOtpClubSystem = () => {
    return this.init().post("/sendOtpToUpdateClubSystem");
  };

  verifyOtpClubSystem = (data) => {
    return this.init().post("/verifyOtpToUpdateClubSystem", data);
  };

  getClientAttendance = (id) => {
    return this.init().get(`/getClientAttendance/${id}`);
  };

  addSubscription = (id, data) => {
    return this.init().post(`/addSubscription/${id}`, data);
  };

  deleteVolumePoints = (id, index) => {
    return this.init().delete(`/deleteVolumePoints?id=${id}&index=${index}`);
  };

  deleteMeetLink = (id) => {
    return this.init().delete(`/deleteMeetLink?meetingId=${id}`);
  };

  updateProfileDetails = (data, coachId) => {
    return this.init("multipart/form-data").put(
      `/updateProfileDetails?id=${coachId}`,
      data
    );
  };

  requestVolumePoints = (data) => {
    return this.init("multipart/form-data").post(`/reqVolumePoints`, data);
  };

  resetCoachPassword = (data) => {
    return this.init().put("/resetCoachPassword", data);
  };
  editCoachRollNoInitials = (data) => {
    return this.init().put("/edit-coach-rollNoInitials", data)
  }

  editClientRollNumber = (data) => {
    return this.init().post(`/edit-rollno`, data);
  }
  editMeeting = (data, id) => {
    return this.init().put(`/edit-meetingLink?meetingId=${id}`, data);
  }
  getFreeTrialUsers = () => {
    return this.init().get("/free-trial-users")
  }

  editCoachFreeTrialVPDays = (data) => {
    return this.init().put("/edit-coach-freeTrialVPDays", data)
  }
  exportAllClientinExcel = () => {
    return this.init().get("export-clients-excel", {
      responseType: 'blob',
    })
  }
  importAllClientinExcel = (file) => {
    return this.init().post("/import-clients-excel", file)
  }
  getSpecialModeData = (clientId) => {
    return this.init().get(`/special-mode-data?clientId=${clientId}`)
  }
  addSpecialPoints = (data, clientId) => {
    return this.init().post(`/special-mode-add-points?clientId=${clientId}`, data)
  }
}

const apiInstance = new Api();
export default apiInstance;
