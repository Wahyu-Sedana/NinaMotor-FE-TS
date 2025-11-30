import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
});

export const registerValidation = Yup.object().shape({
  nama: Yup.string().required("Nama wajib diisi"),

  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),

  noTelp: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
    .min(10, "Nomor telepon terlalu pendek")
    .required("Nomor telepon wajib diisi"),

  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),

  c_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
