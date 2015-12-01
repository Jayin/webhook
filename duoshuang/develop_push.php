<?php

$TOKEN = 'duoshuang';
$GIT_REPO_DIR = '/var/www/html/duoshuang';
$BRANCH = 'master'; //tracking branch

$Data = json_decode(file_get_contents('php://input'));

//check token
if(!isset($Data->token) || $Data->token !== $TOKEN){
    exit('Token is error');
}

shell_exec("echo '".json_encode($Data)."' > log.txt");
shell_exec("echo '\r\n Event:".$Data->event."' >> log.txt");

if($Data->ref === $BRANCH && $Data->event === 'push'){
    shell_exec("cd ".$GIT_REPO_DIR.' && git pull origin '.$BRANCH);
    exit('Finish!');
}
