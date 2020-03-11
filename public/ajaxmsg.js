window.onload = () =>{
    let button = document.getElementById('sendMSG_btn');
    // Add event-listener
    button.addEventListener('click',()=>{
        let name = document.getElementById("a_name").value;
        let country = document.getElementById("a_country").value;
        let message = document.getElementById("a_message").value;

        // Create AJAX-object
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = ()=>{
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                console.log('entered');
                document.getElementById('status').innerHTML = '<p>' + xmlhttp.responseText + '</p>';
            };
        };

        // Send the AJAX query
        xmlhttp.open('POST', '/ajaxsubmit', true);
        xmlhttp.setRequestHeader(
            'Content-type', "application/x-www-form-urlencoded"
        );
        xmlhttp.send('name='+name+'&country='+country+'&message='+message);
    });
};