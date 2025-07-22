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