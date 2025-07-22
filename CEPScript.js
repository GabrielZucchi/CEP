document.getElementById("CEP").addEventListener("blur", function () {

    const cep = this.value.replace(/\D/g, "");

    if (!(cep.length === 8)) {
        alert("CEP inválido. Deve conter 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar o CEP");
            return response.json();
    })

    .then(data => {
        if (data.erro) {
        alert("CEP não encontrado.");
        return;
    }

    document.getElementById("logradouro").value = data.logradouro;
    document.getElementById("municipio").value = data.localidade;
    document.getElementById("UF").value = data.uf;

    })

    .catch(error => {
        alert("Erro ao buscar o endereço.");
        console.error(error);
    });

});

//////////////////////////////////////////////////////////////////////////////////

document.getElementById("botaoEnviar").addEventListener("click", function (e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        telefone: document.getElementById("telefone").value,
        celular: document.getElementById("Celular").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("CEP").value,
        logradouro: document.getElementById("logradouro").value,
        municipio: document.getElementById("municipio").value,
        uf: document.getElementById("UF").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value
        };  

    localStorage.setItem("formulario", JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
});



window.addEventListener("load", function () {
    const dadosSalvos = localStorage.getItem("formulario");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        document.getElementById("nome").value = dados.nome || "";
        document.getElementById("sobrenome").value = dados.sobrenome || "";
        document.getElementById("telefone").value = dados.telefone || "";
        document.getElementById("Celular").value = dados.celular || "";
        document.getElementById("email").value = dados.email || "";
        document.getElementById("CEP").value = dados.cep || "";
        document.getElementById("logradouro").value = dados.logradouro || "";
        document.getElementById("municipio").value = dados.municipio || "";
        document.getElementById("UF").value = dados.uf || "";
        document.getElementById("numero").value = dados.numero || "";
        document.getElementById("complemento").value = dados.complemento || "";
        }
});