import * as Yup from "yup";

const formSchema = Yup.object().shape({
  sexo: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  edad: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(120, "El valor máximo es 120")
    .required("Requerido"),
  ecv: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  tabaquismo: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  epoc: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  ecev: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  cancer: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  enf_art_perif: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  obesidad: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  desnutricion: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  dislipidemia: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  erpad: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  dm: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  hta: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  glomerulopatia: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  tas: Yup.number()
    .min(60, "El valor mínimo es 60")
    .max(220, "El valor máximo es 220")
    .required("Requerido"),
  tad: Yup.number()
    .min(30, "El valor mínimo es 30")
    .max(140, "El valor máximo es 140")
    .required("Requerido"),
  fc: Yup.number()
    .min(30, "El valor mínimo es 30")
    .max(120, "El valor máximo es 120")
    .required("Requerido"),
  hb: Yup.number()
    .min(3, "El valor mínimo es 3")
    .max(25, "El valor máximo es 25")
    .required("Requerido"),
  albumina: Yup.number()
    .min(10, "El valor mínimo es 10")
    .max(70, "El valor máximo es 70")
    .required("Requerido"),
  urea: Yup.number()
    .min(3, "El valor mínimo es 3")
    .max(30, "El valor máximo es 30")
    .required("Requerido"),
  creatinina: Yup.number()
    .min(200, "El valor mínimo es 200")
    .max(1200, "El valor máximo es 1200")
    .required("Requerido"),
  fg: Yup.number()
    .min(1, "El valor mínimo es 1")
    .max(25, "El valor máximo es 25")
    .required("Requerido"),
  acido_urico: Yup.number()
    .min(100, "El valor mínimo es 100")
    .max(900, "El valor máximo es 900")
    .required("Requerido"),
  glucemia: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(15, "El valor máximo es 15")
    .required("Requerido"),
  colesterol: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(12, "El valor máximo es 12")
    .required("Requerido"),
  tgo: Yup.number()
    .min(5, "El valor mínimo es 5")
    .max(120, "El valor máximo es 120")
    .required("Requerido"),
  tgp: Yup.number()
    .min(1, "El valor mínimo es 1")
    .max(150, "El valor máximo es 150")
    .required("Requerido"),
  calcio: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(5, "El valor máximo es 5")
    .required("Requerido"),
  potasio: Yup.number()
    .min(1, "El valor mínimo es 1")
    .max(10, "El valor máximo es 10")
    .required("Requerido"),
  atencion_nefrologica: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  inicio_tardio: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
  ccv: Yup.number()
    .min(0, "El valor mínimo es 0")
    .max(1, "El valor máximo es 1"),
});

export default formSchema;
