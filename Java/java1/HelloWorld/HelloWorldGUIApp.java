import javax.swing.*;
import java.awt.Dimension;
import java.awt.Toolkit;
public class HelloWorldGUIApp {
	public static void main(String[] args) {
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				JFrame frame = new JFrame("HelloWorld GUI");
				frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				frame.setPreferredSize(new Dimension(400, 300)); // 창 크기
				JLabel label = new JLabel("Hello World", SwingConstants.CENTER); // 글자 정보
				frame.getContentPane().add(label); // 해당 글자 정보를 부착
				Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
				frame.setLocation(dim.width/2-400/2, dim.height/2-300/2); // 위치
				
				frame.pack();
				frame.setVisible(true);
			}
		});
	}
}