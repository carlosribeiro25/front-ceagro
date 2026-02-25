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
    <div className="flex gap-4 m-2 p-1" >
      <p className="text-base md:text-lg lg:text-x1">Produtos recebidos </p>
      <p>{dataHora.toLocaleDateString()}</p>
      <p>{dataHora.toLocaleTimeString()}</p>
    </div>
  );
}

export default DataHoraAtual;