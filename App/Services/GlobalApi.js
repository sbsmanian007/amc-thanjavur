import axios from "axios";

const BASE_URL = "http://192.168.29.12:1337/api";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const axiosInstance = axios.create({
  baseURL: BASE_URL,

});

const createAppointment = (data) => axiosInstance.post("/bookings", data);
const getAppointments = () => axiosInstance.get(`/bookings`);
const getAppointmentsByEmail = (email) =>
  axiosInstance.get(`/bookings?filters[email]=${email}`);
const getAvailableDateSlots = (date) => axiosInstance.get(`/available-timings?filters[date]=${date}`);
const postSlotTimingAndDisabledSlot = (data) => axiosInstance.post('/available-timings', data);
const updateSlotAndDisabledSlot = (data, id) => axiosInstance.put(`/available-timings/${id}`, data);
const adminLogin = (data) => axiosInstance.post('/auth/local',data);
const forgotPassword = (data) => axiosInstance.post('/auth/forgot-password', data); 
export default {
  createAppointment,
  getAppointments,
  getAppointmentsByEmail,
  getAvailableDateSlots,
  postSlotTimingAndDisabledSlot,
  updateSlotAndDisabledSlot,
  adminLogin,
  forgotPassword
};
