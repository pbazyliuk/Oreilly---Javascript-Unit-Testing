function fetchPerson(id) {
  var promise = new Promise(function(resolve, reject) {
  fetch('https://swapi.co/api/people/' + id + '/')
    .then(function(response) { 
      if (response.ok) {
        return response.blob();
      } else {
        reject('person ' + id + ' does not exist!');
      }
    })
    .then(function(data) { 
      var reader = new FileReader();
      reader.onload = function() { resolve(JSON.parse(reader.result)); };
      reader.readAsText(data);
    })
    .catch(function(error) {
      reject(error);
    });
  });
  return promise;
}

function formatData(data) {
  if (typeof data == 'object') {
    var ret = '';
    for (var i = 0; i < data.length; i++) {
      ret += formatData(data[i]) + ' ';
    }
    return ret;
  } else {
    if (data.startsWith('http')) {
      var pieces = data.split('/');
      return '<a href="' + data + '">' + pieces[4] + pieces[5] + '</a>';
    } else {
      return data;
    }
  }
}

var form = document.getElementById('getPerson');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  var pid = document.getElementById('pid').value;
  fetchPerson(pid)
    .then(function(personData) {
      var table = '<table border="1"><tr>';
      for (var key in personData) {
        table += '<th>' + key + '</th>';
      }
      table += '</tr><tr>';
      for (var key in personData) {
        table += '<td>' + formatData(personData[key]) + '</td>';
      }
      table += '</tr></table>';
     document.getElementById('person').innerHTML = table;
    })
    .catch(function(err) {
      document.getElementById('person').innerHTML = 'No such person: ' + pid;
    });
});
