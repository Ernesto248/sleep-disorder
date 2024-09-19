import Layout from "../../Components/Layout";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start justify-center m-auto h-auto">
        <div className="w-full md:w-1/2">
          <img src="image.png" alt="" className="w-full h-auto rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center m-auto mt-4 md:mt-0">
          <h1 className="text-4xl font-bold">Enfermedad Renal Crónica</h1>
          <p className="text-xl mt-4">
            Esta aplicación utiliza un modelo de inteligencia artificial para
            predecir la mortalidad de los pacientes con enfermedad renal crónica
            en hemodiálisis
          </p>
          <p className="text-xl mt-4">
            Creado por:
            <br />
            Dr Sergio Escalona <br />
            Ernesto Leonard
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
