import ApiService from "./api/ApiService";

export default class UserService {
  static login = (email: string, password: string, phone_id: string) => {
    const url = "/login";
    let userData = {
      email: email,
      password: password,
      phone_id: phone_id,
    };

    return ApiService.post(url, userData);
  };

  static register = (
    nama: string,
    email: string,
    password: string,
    cPassword: string,
    no_telp: string
  ) => {
    const url = "/register";
    let userData = {
      nama: nama,
      email: email,
      password: password,
      cPassword: cPassword,
      no_telp: no_telp,
    };

    return ApiService.post(url, userData);
  };

  static logout = () => {
    const url = "/logout";
    return ApiService.post(url, [])
  }
}
