import { useState } from 'react';
import './App.css'

function App() {

  const [tempoEstudo, setTempoEstudo] = useState("25");
  const [tempoFolgaCurta, setTempoFolgaCurta] = useState("5");
  const [tempoFolgaLonga, setTempoFolgaLonga] = useState("10");
  const [descricao, setDescricao] = useState("Tempo de Estudo")

  function handleChangeStudy(event) {
    let ans = event.target.value.replace(/[^0-9]/g, '');
    if (parseInt(ans) > 1440) {
      ans = "1440";
    } else if (parseInt(ans) == 0) {
      ans = "25";
    }
    setTempoEstudo(ans);
  }

  function handleChangeRestShort(event) {
    let ans = event.target.value.replace(/[^0-9]/g, '');
    if (parseInt(ans) > 1440) {
      ans = "1440";
    } else if (parseInt(ans) == 0) {
      ans = "5";
    }
    setTempoFolgaCurta(ans);
  }

  function handleChangeRestLong(event) {
    let ans = event.target.value.replace(/[^0-9]/g, '');
    if (parseInt(ans) > 1440) {
      ans = "1440";
    } else if (parseInt(ans) == 0) {
      ans = "10";
    }
    setTempoFolgaLonga(ans);

  }

  return (
    <div className="App">
      <div className="container">
        <div className='data'>
          <label>Tempo de Estudo:</label>
          <input type="text" placeholder='' value={tempoEstudo} onChange={handleChangeStudy} />
          <label>Tempo de Folga Curta:</label>
          <input type="text" placeholder='' value={tempoFolgaCurta} onChange={handleChangeRestShort} />
          <label>Tempo de Folga Longa:</label>
          <input type="text" placeholder='' value={tempoFolgaLonga} onChange={handleChangeRestLong} />
          <label>obs: informe a quantidade em minutos para todos os campos</label>
          <div className='operations'>
            <button className='play'>Começar</button>
            <button className='pause'>Pausar</button>
            <button className='reset'>Reiniciar</button>
          </div>
        </div>
        <div className='timer'>
          <label>{descricao}</label>
          <label>Horas:Minutos:Segundos</label>
        </div>
      </div>
    </div>
  );
}

export default App;
