import  { useState, useEffect } from "react";

function DataHoraAtual() {
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDataHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <h2>Data e Hora Atual</h2>
      <p>{dataHora.toLocaleDateString()}</p>
      <p>{dataHora.toLocaleTimeString()}</p>
    </div>
  );
}

export default DataHoraAtual;