
package conector;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conector {
    
    public Connection getConnection(){
        Connection con = null;
        String caminho = "jdbc:mysql://localhost/onibusca";
        String usuario = "root";
        String senha = "";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = (Connection) 
                    DriverManager.getConnection(caminho, usuario, senha);
            System.out.println("Conectou!");
        } catch (ClassNotFoundException ex) {
            System.out.println("Erro: " + ex);
        } catch (SQLException ex) {
            System.out.println("Erro 2: " + ex);
        }
        return con;
    }
    
}
