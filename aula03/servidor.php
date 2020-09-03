<?php

$numero = $_GET['txtValor'];
$conteudo = "<table border='1'>
                <tr>
                    <th>Valores</th>
                    </tr>";
for ($i = $numero + 1 ; $i<= $numero + 10; $i ++){
    $conteudo = $conteudo . "<tr>
                                <td>".$i."</td>
                                </tr>       ";
}

$conteudo = $conteudo . "</table>";

echo $conteudo;