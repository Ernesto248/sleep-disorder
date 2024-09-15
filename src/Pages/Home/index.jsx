import Layout from "../../Components/Layout";

function Home() {
  return (
    <Layout>
      <div className="flex items-start justify-center m-auto h-auto">
        <div className="w-1/2">
          <img
            src="image.png"
            alt="Descripción de la imagen"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center text-center m-auto ">
          <h1 className="text-4xl font-bold">Enfermedad Renal Cronica</h1>
          <p className="text-xl mt-4">
            Esta aplicacion utiliza un modelo de inteligencia artificial para
            hacer predicciones acerca del estado de los pacientes
          </p>
          <p className="text-xl mt-4">Creado por: Ernesto Leonard</p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
