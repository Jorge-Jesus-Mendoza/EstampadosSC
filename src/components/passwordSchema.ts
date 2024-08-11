import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula."
    )
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula."
    )
    .matches(/\d/, "La contraseña debe contener al menos un número.")
    .matches(
      /[@$!%*?&#]/,
      "La contraseña debe contener al menos un carácter especial."
    )
    .required("La contraseña es requerida."),
});

export default passwordSchema;
