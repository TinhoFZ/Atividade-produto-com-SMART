const inputSalario = document.querySelector('#input-salario');
const labelInputSalario = document.querySelector('#label-input-salario');
const buttonSalario = document.querySelector('#button-salario');

const salarioMensal = document.querySelector('#salario-mensal');
const salarioAnual = document.querySelector('#salario-anual');

const buttonMes = document.querySelector('#button-mes');
const buttonAno = document.querySelector('#button-ano');

const inputDespesasMensais = document.querySelector('#input-despesas-mensais');
const labelInputDespesasMensais = document.querySelector('#label-input-despesas-mensais');
const buttonDespesasMensais = document.querySelector('#button-despesas-mensais');

const inputDespesas = document.querySelector('#input-despesas');
const buttonDespesas = document.querySelector('#button-despesas');

const despesasMensais = document.querySelector('#despesas-mensais');
const despesasAnuais = document.querySelector('#despesas-anuais');

const buttonHistorico = document.querySelector('#button-historico');
const historicoDespesas = document.querySelector('#historico-despesas');

let salario = 0;
let todasDespesas = [];
let despesasMensaisConstantes = 0;

function esconderElemento(elemento) {
    elemento.classList.add('hidden');
}
function mostrarElemento(elemento) {
    elemento.classList.remove('hidden');
}

function adicionarSalario() {
    salario = parseFloat(inputSalario.value);
    if (isNaN(salario) || salario <= 0) {
        alert('Por favor, insira um valor válido para o salário.');
        return;
    }
    salarioMensal.innerText = salario;
    salarioAnual.innerText = (salario * 12).toFixed(2);

    esconderElemento(inputSalario);
    esconderElemento(buttonSalario);
    esconderElemento(labelInputSalario);
}

function passarMes() {
    salarioMensal.innerText = salario - despesasMensaisConstantes;
    despesasMensais.innerText = despesasMensaisConstantes;
}
function passarAno() {
    passarMes();
    salarioAnual.innerText = salario * 12 - despesasMensaisConstantes * 12;
    despesasAnuais.innerText = despesasMensaisConstantes * 12;
}

function adicionarDespesaConstante() {
    despesasMensaisConstantes = parseFloat(inputDespesasMensais.value);
    if (isNaN(despesasMensaisConstantes) || despesasMensaisConstantes <= 0) {
        alert('Por favor, insira um valor válido para as despesas.');
        return;
    }
    despesasMensais.innerText = despesasMensaisConstantes;
    despesasAnuais.innerText = (despesasMensaisConstantes * 12).toFixed(2);
    salarioMensal.innerText = parseFloat(salarioMensal.innerText) - despesasMensaisConstantes;
    salarioAnual.innerText = parseFloat(salarioAnual.innerText) - (despesasMensaisConstantes * 12).toFixed(2);

    esconderElemento(inputDespesasMensais);
    esconderElemento(buttonDespesasMensais);
    esconderElemento(labelInputDespesasMensais);
}

function adicionarDespesa() {
    const despesas = parseFloat(inputDespesas.value);
    if (isNaN(despesas) || despesas <= 0) {
        alert('Por favor, insira um valor válido para as despesas.');
        return;
    }

    salarioMensal.innerText = parseFloat(salarioMensal.innerText) - despesas;
    despesasMensais.innerText = parseFloat(despesasMensais.innerText) + despesas;
    salarioAnual.innerText = parseFloat(salarioAnual.innerText) - despesas;
    despesasAnuais.innerText = parseFloat(despesasAnuais.innerText) + despesas;

    todasDespesas.push("-" + despesas);

    inputDespesas.value = '';
}

function atualizarHistorico() {
    if(historicoDespesas.children.length == 0){
        todasDespesas.forEach(element => {
            elementoLista = document.createElement('li');
            elementoTexto = document.createElement('p');
            elementoBotao = document.createElement('button');

            elementoTexto.innerText = element;
            elementoLista.appendChild(elementoTexto);

            elementoBotao.innerText = 'Remover';
            elementoBotao.classList.add('button-remove');
            elementoLista.appendChild(elementoBotao);

            historicoDespesas.appendChild(elementoLista);
        });
    } else {
        historicoDespesas.innerHTML = '';
    }
}

buttonSalario.addEventListener('click', () => adicionarSalario());
buttonMes.addEventListener('click', () => passarMes());
buttonAno.addEventListener('click', () => passarAno());
buttonDespesasMensais.addEventListener('click', () => adicionarDespesaConstante());
buttonDespesas.addEventListener('click', () => adicionarDespesa());
buttonHistorico.addEventListener('click', () => atualizarHistorico());