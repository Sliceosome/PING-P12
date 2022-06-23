import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  async login(username, password) {
    return axios.post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.clear();
  }

  register(username, email, password, role) {
    console.log({
      username,
      email,
      password,
      role
    });
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
