<?php

namespace App\Controller;

use App\Entity\Cliente;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class ClienteController extends AbstractController
{

    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ClienteController.php',
        ]);
    }

    
    public function storeClient(Request $request){
       
       $entityManager = $this->getDoctrine()->getManager();
       $var = json_decode($request->getContent(), true);
      
       $cliente = new Cliente();
       $cliente->setNome($var["nome"]);
       $cliente->setSenha($var["senha"]);
       $cliente->setCartao($var["cartao"]);
       $cliente->setConta($var["conta"]);
       $cliente->setSaldo($var["saldo"]); 
       $cliente->setImagem($var["imagem"]);
       $cliente->setExtrato($var["extrato"]);

       $entityManager->persist($cliente); 
        
       $entityManager->flush();
      
       return $this->json([
           "sucess" => "Client Storaged! ".$cliente->getId()
       ]);

    }

    public function showClients(){
        $regs = $this->getDoctrine()->getRepository(Cliente::class)->findAll();
        return $this->json($regs);
       
    }


    public function getClient(Request $request,$conta){
        
    $regs = $this->getDoctrine()->getRepository(Cliente::class)->findOneBy(['conta' => $conta]);        
    $var = json_decode($request->getContent(), true);
    $senha = $var['senha']; 
   
    $transacoes = $regs->getExtrato();
     $last_transaction = $transacoes[sizeof($transacoes)-1];
    
    if(!empty($regs) && $senha == $regs->getSenha()){
        $data = [
            'nome' => $regs->getNome(),
            'imagem' => $regs->getImagem(),
            'cartao' => $regs->getCartao(),
            'saldo' => $regs->getSaldo(),
            'ultimaTransacao' => $last_transaction
        ];
    
     return new JsonResponse($data, Response::HTTP_OK);    
    }
    
    
    return new jsonResponse([
          "Erro" => "Cliente não encontrado! Verifique se as credenciais foram inseridas corretamente!"
       ]); 
    }

  

public function getExtrato(Request $request, $conta){
    $regs = $this->getDoctrine()->getRepository(Cliente::class)->findOneBy(['conta' => $conta]);        
    $var = json_decode($request->getContent(), true);
    $senha = $var['senha']; 
    $qtd = $var['qtd'];

    if(!empty($regs) && $regs->getSenha() == $senha){
        $extrato = [];
        $array_data = $regs->getExtrato();

        if(sizeof($regs->getExtrato()) > 0){
           if(sizeof($regs->getExtrato()) >= $qtd){   
            for($i=0; $i<$qtd; $i++){
                $extrato[$i] = $array_data[$i];
            }
           }else{
             for($i=0; $i< sizeof($regs->getExtrato()); $i++){
                    $extrato[$i] = $array_data[$i];
                }  
           }
        }

        $data = [
            "nome" => $regs->getNome(),
            "saldo" => $regs->getSaldo(),
            "extrato" => $extrato 
     ];

        return new JsonResponse($data, Response::HTTP_OK); 
    }


    return new jsonResponse([
        "Erro" => "Cliente não encontrado! Verifique se as credenciais foram inseridas corretamente!"
     ]); 
    
}

public function makeWithDraw(Request $request, $conta){
    $regs = $this->getDoctrine()->getRepository(Cliente::class)->findOneBy(['conta' => $conta]);        
    $var = json_decode($request->getContent(), true);
    $senha = $var['senha']; 
    $valor = $var['valor'];

    if(empty($regs) || $regs->getSenha() != $senha){
        return new JsonResponse([
           "erro" => "Conta Não encontrada! Verifique se as credenciais estão corretas!" 
        ]);   
    }
    
    if(!empty($regs) && $regs->getSenha() == $senha){
            $entityManager = $this->getDoctrine()->getManager();
                    
            if($regs->getSaldo() >= $valor){  
                $extrato = $regs->getExtrato();
                $updateValue = $regs->getSaldo() - $valor;
                $regs->setSaldo($updateValue);
                
                $transacao = [
                    "operacao" => "Saque",
                    "valor" => $valor,
                    "saldo" => $regs->getsaldo()
                ];   
                array_push($extrato,$transacao);
                $regs->setExtrato($extrato);
                $entityManager->flush(); 

                return new JsonResponse([
                    "mensagem" => "Saque realizado com sucesso" 
                 ]);
        
            }else{
                return new JsonResponse([
                    "erro" => "Saldo Insuficiente!" 
                 ]); 
            }
    } 


}


public function makeDeposit(Request $request, $conta){
    $regs = $this->getDoctrine()->getRepository(Cliente::class)->findOneBy(['conta' => $conta]);        
    $var = json_decode($request->getContent(), true);
    $remetente = $var['remetente'];
    $valor = $var['valor'];

    if(empty($regs)){
        return new JsonResponse([
           "erro" => "Conta Não encontrada! Verifique se as credenciais estão corretas!" 
        ]);   
    }else{
            $entityManager = $this->getDoctrine()->getManager();               
            $extrato = $regs->getExtrato();
            $updateValue = $regs->getSaldo() + $valor;
            $regs->setSaldo($updateValue); 
            $transacao = [
                "operacao" => "Deposito no nome de " . $remetente,
                "valor" => $valor,
                "saldo" => $regs->getsaldo()
            ];   
               
            array_push($extrato,$transacao);
            $regs->setExtrato($extrato);
            $entityManager->flush(); 

            return new JsonResponse([
                "mensagem" => "Deposito realizado com sucesso" 
            ]);
        }
    }




}
