import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [tempo, setTempo] = useState(0);
  const [pos, setPos] = useState(0);
  const [tempoEstudo, setTempoEstudo] = useState("25");
  const [tempoFolgaCurta, setTempoFolgaCurta] = useState("5");
  const [tempoFolgaLonga, setTempoFolgaLonga] = useState("10");
  const [descricao, setDescricao] = useState("Tempo de Estudo");
  const [atualiza, setAtualiza] = useState(false);

  function unity(value, opt) {
    let ans = "";
    switch (opt) {
      case 0: ans = (value % 60).toFixed(2);
        break;
      case 1: ans = parseInt((value / 60) % 60).toString();
        break;
      default: ans = parseInt((value / 3600) % 60).toString();
    }
    return ans.replace(/^[0-9]$/gm, '0' + ans);
  }

  function play() {
    setAtualiza(true);
  }

  function pause() {
    setAtualiza(false);
  }

  function reset() {
    setTempo(0);
    setPos(0);
    setDescricao("Tempo de Estudo");
    pause();
  }

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

  function createInterval(value) {
    setTempo(value * 60);
    return setInterval(() => {
      setTempo(value => value - .1);
    }, 10);
  }

  useEffect(() => {
    if (atualiza && tempo < 0.09) {
      setPos(pos + 1);
    }
  }, [tempo]);

  useEffect(() => {
    let interval = null;
    if (atualiza) {
      if (pos == 0) {
        interval = createInterval(tempoEstudo);
        setDescricao("Tempo de Estudo");
      }
      else if (pos == 1) {
        interval = createInterval(tempoFolgaCurta);
        setDescricao("Tempo de Folga Curta");
      }
      else if(pos == 2){
        interval = createInterval(tempoFolgaLonga);
        setDescricao("Tempo de Folga Longa");
      } else {
        reset();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [atualiza, pos]);

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
            <button className='play' onClick={play}>Começar</button>
            <button className='pause' onClick={pause}>Pausar</button>
            <button className='reset' onClick={reset}>Reiniciar</button>
          </div>
        </div>
        <div className='timer'>
          <label>{descricao}</label>
          <label>{unity(tempo, 2)}:{unity(tempo, 1)}:{unity(tempo, 0)}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
