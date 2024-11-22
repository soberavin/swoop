interface TelegramWebApp {
    initData: string;
    initDataUnsafe: any;
    close: () => void;
    ready: () => void;
    sendData: (data: string) => void;
    // Добавьте другие методы и свойства, если они понадобятся
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}