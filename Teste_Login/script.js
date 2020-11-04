function mudarStatus(response) {  
    if (response.status === 'connected') {   
      FB.api('/me', function(response) {
      document.getElementById('mensagem').innerHTML =
        'Obrigado por usar o Teste-Login, ' + response.name + '!';
    });  
    } else {                                
      document.getElementById('mensagem').innerHTML = 'Por Favor log nessa página.';
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