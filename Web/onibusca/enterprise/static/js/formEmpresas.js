const adicionarCidade = document.getElementById('adicionarCidade');


let contador = 1;
adicionarCidade.addEventListener('click', function (){
    // Cria span
    const spanLinha = document.createElement('span')
    spanLinha.id = 'spanLinha'+contador;
    spanLinha.className = 'spanLinha'

    // Cria o botão
    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'btnExcluir';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btnExcluir'

    btnExcluir.addEventListener('click', function () {
        document.getElementById('camposCidade').removeChild(spanLinha);
        contador--;
        atualizarPlaceholders();
    });

    // Cria input
    const novoInput = document.createElement('input')
    novoInput.type = 'text';
    novoInput.id = 'cidade'+contador;
    novoInput.name = 'cidade'+contador;
    novoInput.required = true;
    novoInput.placeholder = `${contador+1} ª cidade`;

    // Adiciona os elementos
    spanLinha.appendChild(novoInput)
    spanLinha.appendChild(btnExcluir);
    document.getElementById('camposCidade').appendChild(spanLinha);

    contador++;
});

// Atualiza quando remove
function atualizarPlaceholders() {
    const inputs = document.querySelectorAll('#camposCidade input');
    inputs.forEach((input, index) => {
        input.placeholder = `${index + 1} ª cidade`;
        input.id = 'cidade' + (index + 1);
        input.name = 'cidade' + (index + 1);
    });
}
