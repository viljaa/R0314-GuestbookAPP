window.onload = () =>{
    let button = document.getElementById('sendMSG_btn');
    // Add event-listener
    button.addEventListener('click',()=>{
        let name = document.getElementById("a_name").value;
        let country = document.getElementById("a_country").value;
        let message = document.getElementById("a_message").value;

        // Check for empty fields
        if (name == '' || country == '' || message == ''){
            alert("Can't sumbit empty fields! Check all input fields!");
        }
        else{
        // Create AJAX-object
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = ()=>{
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                console.log('entered');

                let data = JSON.parse(xmlhttp.responseText);

                let output = '<thead>'+
                                '<tr>'+
                                    '<th class="id_th">ID</th>'+
                                    '<th class="custom_th">Name</th>'+
                                    '<th class="custom_th">Country</th>'+
                                    '<th class="msg_th">Message</th>'+
                                    '<th class="custom_th">Date</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';

                // Format data to a table
                for (var i in data){
                    output += '<tr><td>' + data[i].id + '</td>'
                    + '<td>' + data[i].username + '</td>'
                    + '<td>' + data[i].country + '</td>'
                    + '<td>' + data[i].message + '</td>'
                    + '<td>' + data[i].date + '</td>'
                    + '</tr>';
                }
                output += '</tbody>';

                // Output to correct div
                let outputDIV = document.getElementById('ajax_table');
                outputDIV.innerHTML = output;
            };
        };

        // Send the AJAX query
        xmlhttp.open('POST', '/ajaxsubmit', true);
        xmlhttp.setRequestHeader(
            'Content-type', "application/x-www-form-urlencoded"
        );
        xmlhttp.send('name='+name+'&country='+country+'&message='+message);
        }
    });
};