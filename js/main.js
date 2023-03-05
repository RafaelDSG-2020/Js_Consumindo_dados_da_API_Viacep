var cidade = document.getElementById("cidade");
var logradouro = document.getElementById("endereco");
var estado = document.getElementById("estado");
var bairro = document.getElementById("bairro");

async function Busca_Endereco(cep)
{
    var mensagem_Erro = document.getElementById("erro");
    mensagem_Erro.innerHTML = "";
    try
    {
        var ConsultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var Consulta_Cep_Json = await ConsultaCep.json();
        if(Consulta_Cep_Json.erro)
        {
            throw Error("CEP não Existe!!");
        }

        cidade.value = Consulta_Cep_Json.localidade;
        logradouro.value = Consulta_Cep_Json.logradouro;
        estado.value = Consulta_Cep_Json.uf;
        bairro.value = Consulta_Cep_Json.bairro;

        console.log(Consulta_Cep_Json);
        return Consulta_Cep_Json;
    }
    catch(erro)
    {
        mensagem_Erro.innerHTML = 
        `
            <p id= "erro_p"> CEP inválido. Tente novamente! </p>
            <p id= "erro_p"> Utilize Somente numeros e que tenha 8 Digitos </p>

        `;
        Limpa_locais();
        console.log(erro);
    }
}


var cep = document.getElementById("cep");

cep.addEventListener("focusout", () => 
{
    const Lista = Busca_Endereco(cep.value);
    
});

function Limpa_locais()
{
    cidade.value = "";
    logradouro.value = "";
    estado.value = "";
    bairro.value = "";
}
// Promise All
// let ceps = ["63908153","01001000","01001001"];
// let Conjunto_Ceps =ceps.map(valores => Busca_Endereco(valores));
// Promise.all(Conjunto_Ceps).then(resposta => console.log(resposta));





// Uma forma de Fazer o Codigo Assicrono;
// var ConsultaCep = fetch(`https://viacep.com.br/ws/${63908153}/json/`)
// .then(resposta => resposta.json())
// .then(r => 
// {
//     if(r.erro)
//     {
//         throw Error("Esse Cep Não Existe");
//     }
//     else
//     {
//         console.log(r)
//     }
    
// })
// .catch(erro => console.log(erro))
// .finally("Concluimos a Operação");

// console.log(ConsultaCep);