//This function runs first when we open website and creates a variable in localstorage(chrome)
$(function () {
    let arrAppointment;
    if (typeof (Storage) !== "undefined") {
        arrAppointment = JSON.parse(localStorage.getItem("tbAppointment"));
        if (arrAppointment == null || arrAppointment == "[null]"){
            arrAppointment = [];
            arrAppointment.push(JSON.parse(localStorage.getItem('tbAppointment')));
            localStorage.setItem('tbAppointment', JSON.stringify(arrAppointment));
        }
    }

    $("#date").inputmask("dd/mm/yyyy", {
        placeholder: "dd/mm/yyyy",
        alias: "datetime",
        oncomplete: function(){            
            $("#time").focus();
    }});

    $("#time").inputmask("hh:mm", {
        placeholder: "hh:mm (24h)",
        alias: "datetime",
        oncomplete: function(){            
            $("#submit").focus();
    }});

    $('[data-toggle="popover"]').popover();
    print();
});

//this function runs when you click on "clear form" button and clears the input filled in the form
function clear_input() {
    $("#name").val('');
    $("#time").val('');
    $("#date").val('');
}

//this function runs when you click on "book appointment" button and books an appointment
function make_appointment() {
    let a = [];
    let b = localStorage.getItem('tbAppointment');

    if(b != null){
        a = JSON.parse(localStorage.getItem('tbAppointment'));
        a = a.filter(function (el) {
        return el != null;
        });
    }

    let appointment = {
        id: $("#date").inputmask('unmaskedvalue')+$("#time").inputmask('unmaskedvalue'),
        date:$("#date").val(),
        name:$("#name").val(),
        time: $("#time").val(),
    }; 

    a.push(appointment);
    localStorage.setItem('tbAppointment', JSON.stringify(a));
    print();
}

//this function runs when you click on "clear appointment" button and clears all appointment
function clear_storage(){
    localStorage.clear();
    var arrAppointment = [];
    arrAppointment.push(JSON.parse(localStorage.getItem('tbAppointment')));
    localStorage.setItem('tbAppointment', JSON.stringify(arrAppointment));
    print(true);
}

//this function is used to display booked appointments on right hand side
function print(clear=false) {
    if (clear != false){
        $("#appointment_list > tbody").html("");
        return true;
    };
    let data = JSON.parse((localStorage.getItem("tbAppointment")));
    if (data[0] !== null) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
             $("#appointment_list > tbody").append(
                `
                 <tr>
                    <td class="text-center align-middle">${element.date}</td>
                    <td class="text-center align-middle">${element.time}</td>
                    <td class="text-center align-middle">${element.name}</td>
                </tr>
                `
            );
        }
    }
}
