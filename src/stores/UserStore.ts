import { flow, types as t } from "mobx-state-tree";
import AuthService from "../services/UserServices";
import { log } from "../helpers/Logger";
import { User } from "./models/UserModel";
import { getToken, persistToken } from "@/common/UserStorage";

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
        console.log("ini res", res);

        if (res.data.success) {
          persistToken(res.data.token);
          self.user = User.create({
            email: res.data.data.email,
            nama: res.data.data.nama,
            token: res.data.token,
          });
          return {
            success: true,
            message: res.data.message ?? "Login berhasil",
          };
        } else {
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
            nama: nama,
            email: email,
            no_telp: noTelp,
          });
          return {
            success: true,
            message: res.data.message ?? "Register berhasil",
          };
        } else {
          self.error = res.data.message ?? "Register gagal";
          return { success: false, message: self.error };
        }
      } catch (err: any) {
        self.error = err?.message ?? "Terjadi kesalahan saat register";
        return { success: false, message: self.error };
      } finally {
        self.isLoading = false;
      }
    });

    const getProfile = flow(function* () {
      try {
        const res = yield AuthService.getProfile();
        if (res.data.success) {
          self.user = User.create({
            id: res.data.data.id,
            nama: res.data.data.nama,
            email: res.data.data.email,
            no_telp: res.data.data.no_telp,
          });
          return {
            success: true,
            message: res.data.message ?? "Profile Data Berhasil",
            data: self.user,
          };
        } else {
          self.error = res.data.message ?? "Profile Data Gagal";
          return { success: false, message: self.error };
        }
      } catch (err: any) {
        self.error = err?.message ?? "Terjadi kesalahan saat mengambil profile";
        return { success: false, message: self.error };
      } finally {
        self.isLoading = false;
      }
    });

    const logout = () => {
      self.user = undefined;
    };

    return { login, register, logout, getProfile };
  });

export type IUserStore = typeof UserStore.Type;
