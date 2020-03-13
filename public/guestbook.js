window.onload = ()=>{
    let output = '';

    $.getJSON('https://vj-guestbookapp.herokuapp.com/api/jsondata', (data)=>{ // Change URL to http://localhost:5000/api/jsondata if running locally
    // Iterate through json data and format it
    for (var i in data){
        output += '<tr><td>' + data[i].id + '</td>'
        + '<td>' + data[i].username + '</td>'
        + '<td>' + data[i].country + '</td>'
        + '<td>' + data[i].message + '</td>'
        + '<td>' + data[i].date + '</td>'
        + '</tr>';
    }
        // Output data to correct div
        let outputDIV = document.getElementById('table_data');
        outputDIV.innerHTML = output;
    });
}