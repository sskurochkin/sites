// Отправка данных на сервер
function send(event, php){
    event.preventDefault();
    const form = document.getElementById('form');
    console.log(form);
    let error = formValidate(form);

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    console.log(error);
    function formAddError(input){
        // input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        // input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }


    if(error === 0){
        form.classList.add('_sending');
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
            console.log(json);
            
            // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            if (json.result == "success") {
                // Если сообщение отправлено
                form.reset();
                form.classList.remove('_sending');
                alert("Сообщение отправлено");
            } else {
                // Если произошла ошибка
                form.classList.remove('_sending');
                alert("Ошибка. Сообщение не отправлено");
            }
        // Если не удалось связаться с php файлом
        } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
    
    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function() {alert("Ошибка отправки запроса");};
    req.send(new FormData(event.target));
    }
}


   






// document.addEventListener('DOMContentLoaded', function(){
//     const form = document.getElementById('form');

//     form.addEventListener('submit', sendForm);

//     async function sendForm(e){
//         e.preventDefault();
//         let error = formValidate(form);

//         let formData = new FormData(form);

//         if(error === 0){
//             form.classList.add('_sending');
//             let response = await fetch('../php/sendmail.php', {
//                 method: 'POST',
//                 body: formData
//             });
//             if(response.ok){
//                 let result = await response.json();
//                 alert(result.message);
//                 form.reset();
//                 form.classList.remove('_sending');
//             } else{
//                 alert('Ошибка');
//                 form.classList.remove('_sending');
//             }
//         }else{
//             alert('Заполните обязательные поля');
//         }
//     }

   
// });