import { flow, types as t } from "mobx-state-tree";
import AuthService from "../services/UserServices";
import { log } from "../helpers/Logger";
import { User } from "./models/UserModel";

export const UserStore = t
  .model("UserStore", {
    user: t.maybe(User),
    isLoading: t.optional(t.boolean, false),
    error: t.maybeNull(t.string),
  })
  .actions((self) => {
    const login = flow(function* (
      email: string,
      password: string,
      phone_id: string
    ) {
      self.isLoading = true;
      self.error = null;

      try {
        const res = yield AuthService.login(email, password, phone_id);
        log.info(res);

        if (res.data.success) {
          self.user = User.create({
            email: email,
            nama: null,
            id: null,
            token: res.data.token,
          });
          return { success: true, message: res.message ?? "Login berhasil" };
        } else {
          log.info(res.data);

          self.error = res.data.message ?? "Login gagal";
          return { success: false, message: self.error };
        }
      } catch (err: any) {
        self.error = err?.message ?? "Terjadi kesalahan saat login";
        return { success: false, message: self.error };
      } finally {
        self.isLoading = false;
      }
    });

    const register = flow(function* (
      nama: string,
      email: string,
      password: string,
      cPassword: string,
      noTelp: string
    ) {
      self.isLoading = true;
      self.error = null;

      try {
        const res = yield AuthService.register(
          nama,
          email,
          password,
          cPassword,
          noTelp
        );
        console.log("Register Response:", res);

        if (res.data.success) {
          self.user = User.create({
            nama: res.data.data.nama,
            email: res.data.data.email,
            no_telp: res.data.data.no_telp,
          });
          return { success: true, message: res.message ?? "Register berhasil" };
        } else {
          self.error = res.message ?? "Register gagal";
          return { success: false, message: self.error };
        }
      } catch (err: any) {
        self.error = err?.message ?? "Terjadi kesalahan saat register";
        return { success: false, message: self.error };
      } finally {
        self.isLoading = false;
      }
    });

    const logout = () => {
      self.user = undefined;
    };

    return { login, register, logout };
  });

export type IUserStore = typeof UserStore.Type;
