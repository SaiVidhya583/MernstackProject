import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

// Helper function to handle API responses
const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error("Unexpected Error Occurred!");
  }
};

// Helper function to handle API errors
const handleError = (error) => {
  console.error(error);
  throw error;
};

// ************* LOGIN USER **************/
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    throw err;
  }
};

// ************* REGISTER USER **************/
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ************* GET USER INFO **************/
export const getUserInfo = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/get-user-info`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** APPLY PANDITH ACCOUNT ***********/
export const applyPandithAccount = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/apply-pandith`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** MARK ALL NOTIFICATIONS AS SEEN **************/
export const markAllNotificationsAsSeen = async (userId) => {
  try {
    const response = await axios.post("/auth/mark-all-notifications-as-seen", {
      userId,
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** DELETE ALL SEEN NOTIFICATIONS ***********/
export const deleteAllSeenNotifications = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/delete-all-seen-notifications`, {
      userId,
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** GET ALL USERS ***********/
export const getAllUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/getAllUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** GET ALL PANDITHS ***********/
export const getAllPandith = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/getAllPandiths`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** CHANGE PANDITH ACCOUNT STATUS ***********/
export const changeAccountStatus = async (pandithId, status) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/changeAccountStatus`,
      { pandithId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** GET PANDITH INFO ***********/
export const getPandithInfo = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pandith/get-pandith-info`, { userId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** PANDITH PROFILE UPDATE ***********/
export const updatePandithProfile = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pandith/update-profile`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** GET ALL APPROVED PANDITHS ***********/
export const getAllApprovedPandiths = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/getAllApprovedPandiths`);
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ************** GET PANDITH BY ID ****************/
export const getPandithById = async (pandithId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pandith/getPandithById`, { pandithId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** DONATION FORM ***********/
export const submitDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/donations`, donationData);
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

export const fetchDonations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/donations`);
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ************** APPOINTMENT BOOKING ****************/
export const bookingPooja = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/book-pooja`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ****** CHECK APPOINTMENT IS AVAILABLE OR NOT ******/
export const bookingAvailability = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/booking-availability`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ****** GET USER APPOINTMENTS ******/
export const getUserPoojas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user-poojas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ****** GET PANDITH APPOINTMENTS ******/
export const getPandithPoojas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pandith/pandith-poojas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ******* UPDATE ACCOUNT STATUS *******/
export const updatePoojaStatus = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pandith/updatePoojaStatus`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** DHARSHAN ***********/
export const createDharshan = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dharshan`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

export const getDharshan = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dharshan`);
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

export const updateDharshan = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/dharshan/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

export const deleteDharshan = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/dharshan/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// ********** BLOCK USER ***********/
export const blockUser = async (userId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}/block`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};

// Add a new function to handle scheduling poojas
export const schedulePooja = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/schedule-pooja`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (err) {
    handleError(err);
  }
};