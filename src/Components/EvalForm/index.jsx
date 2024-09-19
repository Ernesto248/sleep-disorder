import React from "react";
import { Formik, Form } from "formik";
import NumberInput from "../NumberInput";
import SelectField from "../SelectField";
import PredictionModal from "../PredictionModal";
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import formSchema from "../../schemas/formSchema";

const handlePredictionResult = (result) => {
  if (result.length === 2) {
    const class1Probability = result[1] * 100; // Convertir a porcentaje
    const roundedClass1Probability = Math.round(class1Probability * 100) / 100;

    console.log(`Resultado de la evaluacion : ${roundedClass1Probability}%`);

    return `${roundedClass1Probability}%`;
  }
  return "Predicción no válida";
};

// Medias y desviaciones estándar extraídas de Python
const means = [
  0.61111111, 55.6666667, 0.216049383, 0.185185185, 0.0740740741, 0.037037037,
  0.049382716, 0.104938272, 0.12345679, 0.203703704, 0.141975309, 0.0740740741,
  0.290123457, 0.469135802, 0.0555555556, 125.123457, 76.7716049, 70.61728395,
  10.9851852, 37.16666667, 15.7132716, 852.740741, 6.66666667, 328.564815,
  4.67111111, 3.78919753, 33.4074074, 38.154321, 1.83641975, 4.73580247,
  0.617283951, 0.135802469, 0.543209877,
];

const stdDevs = [
  0.48749802, 12.56243666, 0.41154835, 0.38844772, 0.2618914, 0.18885257,
  0.21666579, 0.30647387, 0.3289608, 0.40275117, 0.34902481, 0.2618914,
  0.45381917, 0.49904649, 0.22906142, 15.32518521, 14.43387421, 10.76524804,
  2.10027106, 7.35875224, 2.49282175, 122.35409833, 1.77548463, 62.78950576,
  1.35058789, 1.17610887, 9.72305111, 14.5502836, 0.3216002, 0.79618049,
  0.48604987, 0.34257869, 0.49812941,
];

// Función para estandarizar los valores de entrada
const standardize = (inputData) => {
  return inputData.map(
    (value, index) => (value - means[index]) / stdDevs[index]
  );
};

const EvalForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const predict = async (inputData) => {
    if (model) {
      const inputTensor = tf.tensor2d([inputData]);
      const prediction = model.predict(inputTensor);
      return prediction.dataSync();
    }
    return null;
  };

  const predictSubmit = async (event) => {
    event.preventDefault();
    const result = await predict(inputData);
    setPrediction(result[0]);
  };

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("model/model.json");
      setModel(loadedModel);
      loadedModel.summary();
      console.log("modelo cargado");
    };

    loadModel();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const fieldOrder = [
      "sexo",
      "edad",
      "ecv",
      "tabaquismo",
      "epoc",
      "ecev",
      "cancer",
      "enf_art_perif",
      "obesidad",
      "desnutricion",
      "dislipidemia",
      "erpad",
      "dm",
      "hta",
      "glomerulopatia",
      "tas",
      "tad",
      "fc",
      "hb",
      "albumina",
      "urea",
      "creatinina",
      "fg",
      "acido_urico",
      "glucemia",
      "colesterol",
      "tgo",
      "tgp",
      "calcio",
      "potasio",
      "atencion_nefrologica",
      "inicio_tardio",
      "ccv",
    ];

    // Obtener y ordenar los valores del formulario
    const orderedValues = fieldOrder.map((field) => {
      const value = values[field];
      return typeof value === "string" ? Number(value) : value;
    });

    // Estandarizar los valores
    const standardizedValues = standardize(orderedValues);

    console.log(standardizedValues);

    // Llamar a la función de predicción con los valores estandarizados
    const result = await predict(standardizedValues);

    // Procesar el resultado de la predicción
    const mortalityRate = handlePredictionResult(result);

    // Mostrar el resultado de la predicción
    setPrediction(mortalityRate);

    setIsModalOpen(true);

    // Reiniciar el formulario
    // resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          sexo: 0,
          edad: "", //
          ecv: "",
          tabaquismo: "",
          epoc: "",
          ecev: "",
          cancer: "",
          enf_art_perif: "",
          obesidad: "",
          desnutricion: "",
          dislipidemia: "",
          erpad: "",
          dm: "",
          hta: "",
          glomerulopatia: "",
          tas: "",
          tad: "",
          fc: "",
          hb: "",
          albumina: "",
          urea: "",
          creatinina: "",
          fg: "",
          acido_urico: "",
          glucemia: "",
          colesterol: "",
          tgo: "",
          tgp: "",
          calcio: "",
          potasio: "",
          atencion_nefrologica: "",
          inicio_tardio: "",
          ccv: "",
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form>
            <div className="relative border-4 border-blue-500 rounded-lg shadow-md text-center bg-gray-100 p-6">
              <div className="absolute inset-0 bg-gray-100 rounded-lg"></div>
              <div className="relative z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500">
                Evaluar Paciente
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                name="sexo"
                label="Sexo (0-hombre 1-mujer)"
                value={values.sexo}
                handleChange={handleChange}
                error={errors.sexo}
                touched={touched.sexo}
              />
              <NumberInput
                name="edad"
                label="Edad"
                value={values.edad}
                handleChange={handleChange}
                error={errors.edad}
                touched={touched.edad}
              />
              <SelectField
                name="ecv"
                label="ECV"
                value={values.ecv}
                handleChange={handleChange}
                error={errors.ecv}
                touched={touched.ecv}
              />
              <SelectField
                name="tabaquismo"
                label="Tabaquismo"
                value={values.tabaquismo}
                handleChange={handleChange}
                error={errors.tabaquismo}
                touched={touched.tabaquismo}
              />
              <SelectField
                name="epoc"
                label="EPOC"
                value={values.epoc}
                handleChange={handleChange}
                error={errors.epoc}
                touched={touched.epoc}
              />
              <SelectField
                name="ecev"
                label="ECEV"
                value={values.ecev}
                handleChange={handleChange}
                error={errors.ecev}
                touched={touched.ecev}
              />
              <SelectField
                name="cancer"
                label="Cáncer"
                value={values.cancer}
                handleChange={handleChange}
                error={errors.cancer}
                touched={touched.cancer}
              />
              <SelectField
                name="enf_art_perif"
                label="Enfermedad Arterial Periférica"
                value={values.enf_art_perif}
                handleChange={handleChange}
                error={errors.enf_art_perif}
                touched={touched.enf_art_perif}
              />
              <SelectField
                name="obesidad"
                label="Obesidad"
                value={values.obesidad}
                handleChange={handleChange}
                error={errors.obesidad}
                touched={touched.obesidad}
              />
              <SelectField
                name="desnutricion"
                label="Desnutrición"
                value={values.desnutricion}
                handleChange={handleChange}
                error={errors.desnutricion}
                touched={touched.desnutricion}
              />
              <SelectField
                name="dislipidemia"
                label="Dislipidemia"
                value={values.dislipidemia}
                handleChange={handleChange}
                error={errors.dislipidemia}
                touched={touched.dislipidemia}
              />
              <SelectField
                name="erpad"
                label="ERPAD"
                value={values.erpad}
                handleChange={handleChange}
                error={errors.erpad}
                touched={touched.erpad}
              />
              <SelectField
                name="dm"
                label="Diabetes Mellitus"
                value={values.dm}
                handleChange={handleChange}
                error={errors.dm}
                touched={touched.dm}
              />
              <SelectField
                name="hta"
                label="Hipertensión Arterial"
                value={values.hta}
                handleChange={handleChange}
                error={errors.hta}
                touched={touched.hta}
              />
              <SelectField
                name="glomerulopatia"
                label="Glomerulopatía"
                value={values.glomerulopatia}
                handleChange={handleChange}
                error={errors.glomerulopatia}
                touched={touched.glomerulopatia}
              />
              <NumberInput
                name="tas"
                label="TAS"
                value={values.tas}
                handleChange={handleChange}
                error={errors.tas}
                touched={touched.tas}
              />
              <NumberInput
                name="tad"
                label="TAD"
                value={values.tad}
                handleChange={handleChange}
                error={errors.tad}
                touched={touched.tad}
              />
              <NumberInput
                name="fc"
                label="FC"
                value={values.fc}
                handleChange={handleChange}
                error={errors.fc}
                touched={touched.fc}
              />
              <NumberInput
                name="hb"
                label="HB"
                value={values.hb}
                handleChange={handleChange}
                error={errors.hb}
                touched={touched.hb}
              />
              <NumberInput
                name="albumina"
                label="Albumina"
                value={values.albumina}
                handleChange={handleChange}
                error={errors.albumina}
                touched={touched.albumina}
              />
              <NumberInput
                name="urea"
                label="Urea"
                value={values.urea}
                handleChange={handleChange}
                error={errors.urea}
                touched={touched.urea}
              />
              <NumberInput
                name="creatinina"
                label="Creatinina"
                value={values.creatinina}
                handleChange={handleChange}
                error={errors.creatinina}
                touched={touched.creatinina}
              />
              <NumberInput
                name="fg"
                label="FG"
                value={values.fg}
                handleChange={handleChange}
                error={errors.fg}
                touched={touched.fg}
              />
              <NumberInput
                name="acido_urico"
                label="Ácido Úrico"
                value={values.acido_urico}
                handleChange={handleChange}
                error={errors.acido_urico}
                touched={touched.acido_urico}
              />
              <NumberInput
                name="glucemia"
                label="Glucemia"
                value={values.glucemia}
                handleChange={handleChange}
                error={errors.glucemia}
                touched={touched.glucemia}
              />
              <NumberInput
                name="colesterol"
                label="Colesterol"
                value={values.colesterol}
                handleChange={handleChange}
                error={errors.colesterol}
                touched={touched.colesterol}
              />
              <NumberInput
                name="tgo"
                label="TGO"
                value={values.tgo}
                handleChange={handleChange}
                error={errors.tgo}
                touched={touched.tgo}
              />
              <NumberInput
                name="tgp"
                label="TGP"
                value={values.tgp}
                handleChange={handleChange}
                error={errors.tgp}
                touched={touched.tgp}
              />
              <NumberInput
                name="calcio"
                label="Calcio"
                value={values.calcio}
                handleChange={handleChange}
                error={errors.calcio}
                touched={touched.calcio}
              />
              <NumberInput
                name="potasio"
                label="Potasio"
                value={values.potasio}
                handleChange={handleChange}
                error={errors.potasio}
                touched={touched.potasio}
              />
              <SelectField
                name="atencion_nefrologica"
                label="Atención Nefrológica"
                value={values.atencion_nefrologica}
                handleChange={handleChange}
                error={errors.atencion_nefrologica}
                touched={touched.atencion_nefrologica}
              />
              <SelectField
                name="inicio_tardio"
                label="Inicio Tardío"
                value={values.inicio_tardio}
                handleChange={handleChange}
                error={errors.inicio_tardio}
                touched={touched.inicio_tardio}
              />
              <SelectField
                name="ccv"
                label="CCV"
                value={values.ccv}
                handleChange={handleChange}
                error={errors.ccv}
                touched={touched.ccv}
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Evaluar
            </button>
          </Form>
        )}
      </Formik>
      <PredictionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        prediction={prediction}
      />
    </div>
  );
};

export default EvalForm;
