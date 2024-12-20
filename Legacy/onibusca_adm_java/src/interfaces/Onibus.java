/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package interfaces;

import conector.Conector;
import java.awt.Toolkit;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JFrame;
import javax.swing.JOptionPane;


/**
 *
 * @author thale
 */
public class Onibus extends javax.swing.JFrame {

    /**
     * Creates new form Onibus
     */
    public Onibus() {
        initComponents();
        PopulaEmpresas();
        PopulaTipo();
        setLocationRelativeTo(null);
        InserirIcone(this);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        txtPlaca = new javax.swing.JTextField();
        jLabel5 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        BtnConcluido = new javax.swing.JButton();
        CBEmpresa = new javax.swing.JComboBox<>();
        CBTipo = new javax.swing.JComboBox<>();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("OniBusca: Cadastrar Motorista");
        setResizable(false);

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 36)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(60, 85, 79));
        jLabel1.setText("ônibus");

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 36)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(21, 16, 24));
        jLabel2.setText("Cadastrar");

        jLabel4.setFont(new java.awt.Font("Segoe UI", 0, 24)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(21, 16, 24));
        jLabel4.setText("Placa:");

        txtPlaca.setFont(new java.awt.Font("Segoe UI", 0, 24)); // NOI18N

        jLabel5.setFont(new java.awt.Font("Segoe UI", 0, 24)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(21, 16, 24));
        jLabel5.setText("Empresa:");

        jLabel7.setFont(new java.awt.Font("Segoe UI", 0, 24)); // NOI18N
        jLabel7.setForeground(new java.awt.Color(21, 16, 24));
        jLabel7.setText("Tipo:");

        BtnConcluido.setBackground(new java.awt.Color(60, 85, 79));
        BtnConcluido.setFont(new java.awt.Font("Segoe UI", 1, 36)); // NOI18N
        BtnConcluido.setForeground(new java.awt.Color(255, 255, 255));
        BtnConcluido.setText("Concluído");
        BtnConcluido.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                BtnConcluidoActionPerformed(evt);
            }
        });

        CBEmpresa.setFont(new java.awt.Font("Noto Sans", 0, 24)); // NOI18N

        CBTipo.setFont(new java.awt.Font("Noto Sans", 0, 24)); // NOI18N

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                        .addComponent(CBTipo, javax.swing.GroupLayout.PREFERRED_SIZE, 346, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(CBEmpresa, javax.swing.GroupLayout.PREFERRED_SIZE, 346, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(29, 29, 29)
                                .addComponent(jLabel2)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel1))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(47, 47, 47)
                                .addComponent(BtnConcluido, javax.swing.GroupLayout.PREFERRED_SIZE, 305, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(txtPlaca, javax.swing.GroupLayout.PREFERRED_SIZE, 208, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel4)
                            .addComponent(jLabel5)
                            .addComponent(jLabel7))))
                .addContainerGap(27, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(28, 28, 28)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(jLabel2))
                .addGap(18, 18, 18)
                .addComponent(jLabel4)
                .addGap(3, 3, 3)
                .addComponent(txtPlaca, javax.swing.GroupLayout.PREFERRED_SIZE, 44, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel5)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(CBEmpresa, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel7)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(CBTipo, javax.swing.GroupLayout.PREFERRED_SIZE, 55, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(30, 30, 30)
                .addComponent(BtnConcluido, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(18, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void BtnConcluidoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_BtnConcluidoActionPerformed
        String strPlaca = txtPlaca.getText();
        String strEmpresa = CBEmpresa.getSelectedItem().toString();
        String strTipo = CBTipo.getSelectedItem().toString();
    

        if (strPlaca.equals("") || strEmpresa.equals("Selecione") || strTipo.equals("Selecione")){
            JOptionPane.showMessageDialog(null,"Preencha todos os campos corretamente!");

        
        }else{
            String[] ids = getIDs();
            String sql = "insert into onibus (placa, empresa_id, tipo_id) values (?,?,?)";
            Conector conector = new Conector();
            Connection con = conector.getConnection();
            try{
                PreparedStatement stm = con.prepareStatement(sql);
                stm.setString(1, strPlaca);
                stm.setString(2, ids[0]);
                stm.setString(3, ids[1]);
                stm.execute();
                stm.close();
                con.close();
                JOptionPane.showMessageDialog(null,"Ônibus Inserido!");
                this.setVisible(false);
                Principal principal = new Principal();
                principal.setVisible(true);
            }
            catch(SQLException ex){
                System.out.println(ex);
            }

        }
    }//GEN-LAST:event_BtnConcluidoActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Onibus.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Onibus.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Onibus.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Onibus.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Onibus().setVisible(true);
            }
        });
    }
    private void PopulaEmpresas(){
      
        try {
            String sql = "select * from empresa";
            Conector conector = new Conector();
            Connection con = conector.getConnection();
            PreparedStatement stm = con.prepareStatement(sql);
            stm.execute();
            ResultSet rs = stm.executeQuery(sql);
            CBEmpresa.addItem("Selecione:");
            while (rs.next()){
            CBEmpresa.addItem(rs.getString("nome"));
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(Onibus.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    private void PopulaTipo(){
         try {
            String sql = "select * from tipo_oni";
            Conector conector = new Conector();
            Connection con = conector.getConnection();
            PreparedStatement stm = con.prepareStatement(sql);
            stm.execute();
            ResultSet rs = stm.executeQuery(sql);
            CBTipo.addItem("Selecione:");
            while (rs.next()){
            CBTipo.addItem(rs.getString("NOME"));
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(Onibus.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    private String[] getIDs(){
        String strEmpresa = CBEmpresa.getSelectedItem().toString();
        String strTipo = CBTipo.getSelectedItem().toString();
        String sql = "select id from empresa where NOME = ?";
        String sql2 = "select id from tipo_oni where NOME = ?";
        Conector conector = new Conector();
        Connection con = conector.getConnection();
        String[] strings = new String[2];

        try{
            
            PreparedStatement stm = con.prepareStatement(sql);
            stm.setString(1, strEmpresa);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                strings[0] = rs.getString("ID");
            }
            stm.execute();
           
        }
        catch(SQLException ex){
            System.out.println(ex);
        }
        try{
            
            PreparedStatement stm = con.prepareStatement(sql2);
            stm.setString(1, strTipo);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                strings[1] = rs.getString("id");
            }
            stm.execute();
           
        }
        catch(SQLException ex){
            System.out.println(ex);
        }
        return strings;
        
    }
    public static void InserirIcone(JFrame frm){
        try{
            frm.setIconImage(Toolkit.getDefaultToolkit().getImage("src/media/OniBusca.png"));
        }
        catch(Exception ex){
            System.out.println(ex.toString());
        }
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton BtnConcluido;
    private javax.swing.JComboBox<String> CBEmpresa;
    private javax.swing.JComboBox<String> CBTipo;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JTextField txtPlaca;
    // End of variables declaration//GEN-END:variables
}
