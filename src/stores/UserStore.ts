import { flow, types as t } from "mobx-state-tree";
import AuthService from "../services/UserServices";

export const User = t.model("User", {
  id: t.maybeNull(t.string),
  name: t.maybeNull(t.string),
  email: t.maybeNull(t.string),
  token: t.maybeNull(t.string),
});

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
        console.log(res);

        if (res.status === 200) {
          return { success: true, message: res.message ?? "Login berhasil" };
        } else {
          self.error = res.message ?? "Login gagal";
          return { success: false, message: self.error };
        }
      } catch (err: any) {
        self.error = err?.message ?? "Terjadi kesalahan saat login";
        return { success: false, message: self.error };
      } finally {
        self.isLoading = false;
      }
    });

    const logout = () => {
      self.user = undefined;
    };

    return { login, logout };
  });

export type IUserStore = typeof UserStore.Type;
