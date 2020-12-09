
function carrega(){
  $("#cabecLista").html("Lista de Filmes de " + document.cookie);
}

function buscaFilme () {
  $("#filme").append(new Option("Selecione o Filme",0,true));
  $.get( "http://localhost:8001/filmes", function( data ) {
     $.each(data,function(i,linha){
       $("#filme").append(new Option(linha.nome,linha.nome));
     })
  });
}



function excluir(param){
  $.ajax({
      url: "http://localhost:8001/filme/" + param,
      type: 'DELETE',
      success: function(data) {
          alert(data);
      }
  });
}

function carregatab(){
  $.get( "http://localhost:8001/listarfilmes", function( data ) { 
    var html = "";
    $.each(data,function(i,linha){
      html += "<tr>";
      html += "<td>"+ linha.filme +"</td>";
      html += "<td>"+ linha.nota +"</td>";
      html += "<td><a href='#' onClick='editar(" + linha.filme + ")' id='editar'>Editar</td>";
      html += "<td><a href='#' onClick='excluir(" + linha.nota + ")'>Deletar</a></td>";
      html += "</tr>";
    })
    console.log(html);
    $("#conteudo").html(html);
  });
}

function salvar(){
  
  var filme = $("#filme").val();
  var nota  = $("#nota").val();

  $.post( "http://localhost:8001/criaFilme",{"filme": filme,"nota":nota}, function( data ) {
     carregatab(); 
  });
}

function mudarStatus(response) {  

    if (response.status === 'connected') {   
      FB.api('/me', function(response) {
        document.cookie = response.name;    
        window.location.href ='telaPrincipal.html';
    });  

    } else {                       
      document.getElementById('mensagem').innerHTML = 'Faça seu login para criar sua Playlist';
    }
  }

  function verificaLogin() {           
    FB.getLoginStatus(function(response) {  
      mudarStatus(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '354766135777658',
      cookie     : true,                     
      xfbml      : true,                     
      version    : 'v8.0'           
    });

    FB.getLoginStatus(function(response) {   
      mudarStatus(response);        
    });
  };  