# 컴포짓 패턴 활용

- Java의 Swing 라이브러리
  - 데스크탑용 프로그램을 만드는 API
- Java의 JSF (Java Server  Faces) 라이브러리
  - Component 기반의 Web UI를 만드는 용도



## Java의 Swing

```java
public static void main(String[] args) {
  JFrame frame = new JFrame();

  JTextField textField = new JTextField();
  textField.setBounds(200, 200, 200, 40);
  frame.add(textField);

  JButton button = new JButton("click");
  button.setBounds(200, 100, 60, 40);
  button.addActionListener(e -> textField.setText("Hello Swing"));
  frame.add(button);

  frame.setSize(600, 400);
  frame.setLayout(null);
  frame.setVisible(true);
}
```

**데스크탑용 프로그램을 만드는 API**

JFrame에 JTextField와 JButton이 추가됨

- Composite
  - JFrame -> Frame -> Window -> Container -> Component

- Leaf
  - JTextField -> JTextComponent -> JComponent -> Container -> Component
  - JButton -> AbstractButton -> JComponent -> Container -> Component