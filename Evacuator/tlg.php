<?php

$title = $_POST['title'];
$name = $_POST['name'];
$phone = $_POST['phone'];
// $msg = $_POST['msg'];
$token = "1896765454:AAEquNaSj9aGj9tzZumJDjfsMH7F8U6BQxw";
$chat_id = "-1001303253476";
$arr = array(
  'Тема:' => $title,
  'Имя: ' => $name,
  'Телефон: ' => $phone,
//   'Сообщение:' => $msg
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
    echo "Заявка отправлена. С вами свяжутся в ближайшее время.";
} else {
  echo "Произошла ошибка. Просьба позвонить по номеру, указанному на сайте.";
}
?>