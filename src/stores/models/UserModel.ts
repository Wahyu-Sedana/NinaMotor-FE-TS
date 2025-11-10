import { t } from "mobx-state-tree";

export const User = t.model("User", {
  id: t.maybeNull(t.string),
  nama: t.maybeNull(t.string),
  email: t.maybeNull(t.string),
  no_telp: t.maybeNull(t.string),
  token: t.maybeNull(t.string),
});
