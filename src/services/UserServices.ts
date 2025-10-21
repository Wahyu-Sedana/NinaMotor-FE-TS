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
}
