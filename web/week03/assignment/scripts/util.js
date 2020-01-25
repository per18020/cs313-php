async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response;
}

let notifyTimeout = null;
function notify(msg) {
  var x = document.getElementById("notify");
  x.innerHTML = msg;
  x.classList.add("show");
  if (notifyTimeout) clearTimeout(notifyTimeout);
  notifyTimeout = setTimeout(function () { x.classList.remove("show") }, 2900);
}

let errorTimeout = null;
function error(msg) {
  var x = document.getElementById("error");
  x.innerHTML = msg;
  x.classList.add("show");
  if (errorTimeout) clearTimeout(errorTimeout);
  errorTimeout = setTimeout(function () { x.classList.remove("show") }, 2900);
}