import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  /*Nome do estado 'input'*/ /*setInput funçao e valor do estado*/
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Informe o CEP!");
      return;
    }

    try {
      /* TRY  é o que pode dar errado*/
      const response = await api.get(
        `${input}/json`
      ); /* AWAIT Para ele esperar a Requisição*/
      setCep(response.data);
      setInput(""); /*Limpar barra de busca */
    } catch {
      alert(
        "Ops erro ao buscar"
      ); /*caso o cep nao exista o usuario digite errado */
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador De CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite Um CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
