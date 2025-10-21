import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
});
