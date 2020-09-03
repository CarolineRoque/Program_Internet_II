function validarForm(){
    var nome = document.forms["meuForm"]["txtNome"].value;
    if (nome == ""){
        alert("O campo Nome deve ser preenchido");
        return false;
    }
}

function validarNumero(){
    var valor, texto;
    valor = document.getElementById("txtValor").value;
    if( isNaN (valor)  || valor <1 || valor >10){
        texto = "Valor Inválido";
    }else{
        texto = "Valor Ok";
    }    
    document.getElementById("resultado").innerHTML = texto; 
}

function aulaObjeto(){
    var pessoa = {
        nome : "João",
        sobrenome : "da Silva",
        idade : 45 ,
        altura : 1.75,
        nomeCompleto : function(){
            return this.nome + " " + this.sobrenome; 
        },
        atualizarIdade: function( valor ){
            var novaIdade = this.idade + valor;
            this.idade = novaIdade;
            return this.idade;
        }

    };
    var texto = ("Nome: " + pessoa.nomeCompleto() + "<br>");
    texto += "Idade: " + pessoa.idade;
    document.write (texto);
    document.write("<br>------------------------------<br>")
    document.write("Nova Idade: " + pessoa.atualizarIdade(2));
}