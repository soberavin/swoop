import { useEffect, useState } from "react";

const App = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем наличие Telegram API
    if (typeof window.Telegram === "undefined" || !window.Telegram.WebApp) {
      console.warn("Telegram WebApp API недоступен.");
      setError("Приложение может работать только в Telegram WebApp.");
      return;
    }

    // Telegram WebApp API
    const tg = window.Telegram.WebApp;
    tg.ready(); // Уведомляем Telegram о готовности приложения

    // Получаем данные о пользователе
    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData(user);
    }
  }, []);

  const sendToServer = async () => {
    try {
      const response = await fetch("https://swoop-three.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Пример запроса" }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Данные успешно отправлены на сервер!");
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
      alert("Произошла ошибка при отправке данных на сервер.");
    }
  };

  window.Telegram.WebApp.showPopup({
    title: "Debug Info",
    message: "Ваше сообщение или отладочная информация",
  });

  return (
    <div>

    <h1>HELLO</h1>

      {error ? (
        <div>
          <h1>Ошибка</h1>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h1>Добро пожаловать, {userData?.first_name || "гость"}!</h1>
          <button onClick={sendToServer}>Отправить данные на сервер</button>
        </>
      )}
    </div>
  );
};

export default App;
