import { useEffect, useState } from "react";

const App = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp; // Telegram WebApp API
    tg.ready(); // Уведомляем Telegram о готовности приложения

    // Получаем данные о пользователе
    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData(user);
    }
  }, []);

  const sendToServer = async () => {
    const response = await fetch("https://swoop-three.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Пример запроса" }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h1>Добро пожаловать, {userData?.first_name || "гость"}!</h1>
      <button onClick={sendToServer}>Отправить данные на сервер</button>
    </div>
  );
};

export default App;
