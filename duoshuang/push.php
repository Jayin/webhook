<?php

$TOKEN = 'duoshuang';
$GIT_REPO_DIR_MASTER = '/var/www/html/duoshuang';
$GIT_REPO_DIR_DEVELOP = '/var/www/html/test/duoshuang';
$BRANCH_MASTER = 'master'; //production
$BRANCH_DEVELOP = 'develop'; //dev

$Data = json_decode(file_get_contents('php://input'));

//check token
if(!isset($Data->token) || $Data->token !== $TOKEN){
    exit('Token is error');
}

shell_exec("echo '".json_encode($Data)."' > log.txt");
shell_exec("echo '\r\n Event:".$Data->event."' >> log.txt");

if($Data->ref === $BRANCH_MASTER && $Data->event === 'push'){
    shell_exec("cd ".$GIT_REPO_DIR_MASTER.' && git pull origin '.$BRANCH_MASTER);
    exit('Finish!');
}

if($Data->ref === $BRANCH_DEVELOP && $Data->event === 'push'){
    shell_exec("cd ".$GIT_REPO_DIR_DEVELOP.' && git pull origin '.$BRANCH_DEVELOP);
    exit('Finish!');
}
