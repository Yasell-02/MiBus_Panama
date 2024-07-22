document.getElementById('check-balance').addEventListener('click', function () {
    var cardNumber = document.getElementById('card-number').value;
  
    if (cardNumber === "") {
      alert("Por favor, ingrese un número de tarjeta válido.");
      return;
    }
  
    // Verificar si hay saldo en el almacenamiento local
    var cachedBalance = localStorage.getItem(cardNumber);
    if (cachedBalance) {
      document.getElementById('balance-result').innerText = `Saldo disponible: B/. ${cachedBalance} (caché)`;
    } else {
      document.getElementById('balance-result').innerText = "No hay datos en caché. Intentando obtener saldo en línea...";
    }
  
    var apiUrl = `https://saldometrobus.yizack.com/api/v2/tarjeta/${cardNumber}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok" && data.tarjeta) {
          var saldo = data.tarjeta.saldo;
          document.getElementById('balance-result').innerText = `Saldo disponible: B/. ${saldo}`;
          // Guardar saldo en almacenamiento local
          localStorage.setItem(cardNumber, saldo);
        } else {
          document.getElementById('balance-result').innerText = "No se pudo obtener el saldo. Verifique el número de tarjeta e inténtelo nuevamente.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('balance-result').innerText = "Hubo un error al consultar el saldo. Inténtelo nuevamente más tarde.";
      });
  });
  