import axios from "axios";
import {
  UserFormValuesLogin,
  UserFormValuesRegister,
} from "../../app/models/user";
const API_URL = "https://localhost:7260/api/Auth";
const token = (localStorage.getItem("user"));
class AuthService {

  login(creds: UserFormValuesLogin) {
    return axios.post(API_URL + "/login", creds).then((response) => {
      if (response.data) {
        localStorage.setItem("user", response.data);
        {window.location.href='/'}
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(creds: UserFormValuesRegister) {
    {window.location.href='/login'}
      return axios.post(API_URL + "/register", {
      creds,
    });
  }

  getCurrentUser() {
    return localStorage.getItem("user");
  }

  checkAdmin() {
    const role = localStorage.getItem("user");
    if (role == "Admin") {
      return true;
    }
  }
  
}

export default new AuthService();


