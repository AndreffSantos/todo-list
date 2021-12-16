// Constantes do scripts.
const input = document.querySelector('#texto-tarefa');
const buttonCriarTarefa = document.querySelector('#criar-tarefa');
const olListaTarefas = document.querySelector('#lista-tarefas');
const buttonApagarTarefas = document.querySelector('#apaga-tudo');
const buttonRemoverFinalizados = document.querySelector('#remover-finalizados');
const buttonSalvarTarefas = document.querySelector('#salvar-tarefas');
const buttonMoverCima = document.querySelector('#mover-cima');
const buttonMoverBaixo = document.querySelector('#mover-baixo');
const buttonRemoverSelecionado = document.querySelector('#remover-selecionado');
const list = 'LISTA';

// Todas as funções do script.
function adicionaTarefa() {
  const newLi = document.createElement('li');
  newLi.innerText = input.value;
  olListaTarefas.appendChild(newLi);
  input.value = '';
}

function selecionaTarefa(event) {
  const eTarget = event.target;
  if (eTarget.id !== 'lista-tarefas') {
    if (document.querySelector('.selected') === null) {
      eTarget.classList.toggle('selected');
    } else {
      document.querySelector('.selected').classList.remove('selected');
      eTarget.classList.add('selected');
    }
  }
}

function riscarTarefa(event) {
  const eTarget = event.target;
  console.log(eTarget.id);
  if (eTarget.id !== 'lista-tarefas') {
    eTarget.classList.toggle('completed');
  }
}

function apagarLista() {
  olListaTarefas.innerHTML = '';
  localStorage.clear();
}

function salvarLista() {
  const lista = document.querySelector('#lista-tarefas');
  if (document.querySelector('.selected') !== null) {
    document.querySelector('.selected').classList.toggle('selected');
  }
  localStorage.setItem(list, lista.innerHTML);
}

function removerFinalizados() {
  const tarefasFinalizados = document.querySelectorAll('.completed');
  for (let index = 0; index < tarefasFinalizados.length; index += 1) {
    olListaTarefas.removeChild(tarefasFinalizados[index]);
  }
  salvarLista();
}

function teclaParaCima(e) {
  const selected = document.querySelector('.selected');
  if (e.id === 'mover-cima' && selected !== null && selected.previousElementSibling !== null) {
    return true;
  }
  return false;
}

function teclaParaBaixo(e) {
  const selected = document.querySelector('.selected');
  if (e.id === 'mover-baixo' && selected !== null && selected.nextElementSibling !== null) {
    return true;
  }
  return false;
}

function moverTarefa(event) {
  const eTarget = event.target;
  const selected = document.querySelector('.selected');
  if (teclaParaCima(eTarget)) {
    olListaTarefas.insertBefore(selected, selected.previousElementSibling);
  } else if (teclaParaBaixo(eTarget)) {
    olListaTarefas.insertBefore(selected.nextElementSibling, selected);
  }
}

function removerSelecionado() {
  if (document.querySelector('.selected') !== null) {
    olListaTarefas.removeChild(document.querySelector('.selected'));
    salvarLista();
  }
}

// Chama todas as funções
buttonCriarTarefa.addEventListener('click', adicionaTarefa);
olListaTarefas.addEventListener('click', selecionaTarefa);
olListaTarefas.addEventListener('dblclick', riscarTarefa);
buttonApagarTarefas.addEventListener('click', apagarLista);
buttonRemoverFinalizados.addEventListener('click', removerFinalizados);
buttonSalvarTarefas.addEventListener('click', salvarLista);
buttonMoverCima.addEventListener('click', moverTarefa);
buttonMoverBaixo.addEventListener('click', moverTarefa);
buttonRemoverSelecionado.addEventListener('click', removerSelecionado);

window.onload = function myFunction() {
  if (localStorage !== null) {
    olListaTarefas.innerHTML = localStorage.getItem(list);
  }
};
