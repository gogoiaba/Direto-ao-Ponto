let contadorLinhas = 2;

// Adiciona nova linha de horários
document.getElementById("adicionarHorario").addEventListener("click", () => {
  contadorLinhas++;

  const novaLinha = document.createElement("div");
  novaLinha.classList.add("linha-horarios");

  novaLinha.innerHTML = `
    <label>
      Entrada
      <input type="time" name="entrada${contadorLinhas}" />
    </label>
    <label>
      Saída
      <input type="time" name="saida${contadorLinhas}" />
    </label>
  `;

  if (contadorLinhas > 2) {
    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "x";
    btnRemover.addEventListener("click", () => {
      novaLinha.remove();
    });
    novaLinha.appendChild(btnRemover);
  }

  document.getElementById("horarios").appendChild(novaLinha);
});

// Limpa todos os horários e remove linhas extras
document.getElementById("limparHorarios").addEventListener("click", () => {
  const containerHorarios = document.getElementById("horarios");

  const linhas = containerHorarios.querySelectorAll(".linha-horarios");
  linhas.forEach((linha, index) => {
    if (index >= 2) {
      linha.remove();
    } else {
      const inputs = linha.querySelectorAll('input[type="time"]');
      inputs.forEach((input) => {
        input.value = "";
        input.style.backgroundColor = "";
      });
    }
  });

  contadorLinhas = 2;
});

// Completa o horário faltante
document.getElementById("completarHorario").addEventListener("click", () => {
  const jornadaSelecionada = document.querySelector(
    'input[name="jornada"]:checked'
  ).value;
  const jornadaLiquidaMinutos = jornadaSelecionada === "6" ? 345 : 480; // 5h45 ou 8h

  const entradas = Array.from(
    document.querySelectorAll('input[name^="entrada"]')
  );
  const saidas = Array.from(document.querySelectorAll('input[name^="saida"]'));

  const horarios = [];

  for (let i = 0; i < entradas.length; i++) {
    const entrada = entradas[i].value ? toMinutes(entradas[i].value) : null;
    const saida = saidas[i].value ? toMinutes(saidas[i].value) : null;
    horarios.push({ entrada, saida, index: i });
  }

  const vazio = horarios.flatMap((h, i) => {
    const campos = [];
    if (h.entrada === null) campos.push({ tipo: "entrada", index: i });
    if (h.saida === null) campos.push({ tipo: "saida", index: i });
    return campos;
  });

  if (vazio.length !== 1) {
    alert("Preencha exatamente 3 horários e deixe apenas 1 em branco.");
    return;
  }

  const preenchido = horarios.map((h) => {
    if (h.entrada !== null && h.saida !== null) {
      return h.saida - h.entrada;
    }
    return null;
  });

  const totalPreenchido = preenchido.reduce((acc, val) => acc + (val || 0), 0);
  const restante = jornadaLiquidaMinutos - totalPreenchido;

  const campo = vazio[0];
  const h = horarios[campo.index];

  let valorCalculado;
  if (campo.tipo === "entrada" && h.saida !== null) {
    valorCalculado = h.saida - restante;
    entradas[campo.index].value = toTime(valorCalculado);
    entradas[campo.index].style.backgroundColor = "#d4f8d4";
  } else if (campo.tipo === "saida" && h.entrada !== null) {
    valorCalculado = h.entrada + restante;
    saidas[campo.index].value = toTime(valorCalculado);
    saidas[campo.index].style.backgroundColor = "#d4f8d4";
  } else {
    alert("Não foi possível completar o horário. Verifique os dados.");
  }
});

// Utilitários
function toMinutes(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function toTime(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
