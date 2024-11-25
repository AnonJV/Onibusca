/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package onibusca_admin;

import interfaces.Login;

/**
 *
 * @author thalessz <o.thales1904@gmail.com// github.com/thalessz>
 * 
 * CONSIDERAÇÕES IMPORTANTES
 * RECOMENDÁVEL: quaisquer operações com banco de dados deve ser feita em letra minuscula (principalmente se vc estiver utilizando linux!!! no windows essa desgraça funciona por alugm motivo)
 * se nao da pau e quero ver quem q vai resolver essa porra (eu que nao vou!!)
 * ademais, evite mexer em codigo que ja tava aqui antes de voce entrar,
 * tem tanta gambiarra violenta que eu nem lembro quais sao. as q eu lembrar tem comentario avisando :)
 * a interface ta horrivel e o codigo ta pior ainda. depois eu refaco ç-ç
 * atenciosamente, thales.
 * ps²: nao garanto q nada aqui funcione. Toda vez que eu commito aparece um bug diferente. 
 * 
 *  BUGS CONHECIDOS:
 * -> as vezes deus decide q nao vai fazer o crud (nao achei solucao)
 * -> quando vc aperta pra fechar uma aba ela fecha o programa inteiro
 * -> quando vc da o build no projeto as imagens param de carregar (mas o resto funciona direitinho, eu acho...)
 */
public class Onibusca_admin {

    /**
ç     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.printf("Onibusca Admin Server\nBem vindo!");
        Login login = new Login();
        login.setVisible(true);
    }
    
}
