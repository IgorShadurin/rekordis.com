import { headers } from "next/headers";
import { Brand } from "@/components/Brand";

export async function generateMetadata() {
  const ru = (await headers()).get("host")?.startsWith("ru.");
  return {
    title: ru ? "Конфиденциальность приложения SpiderRoute" : "SpiderRoute iOS Privacy Policy",
    description: ru
      ? "Обработка данных в приложении SpiderRoute для iPhone и iPad."
      : "How the SpiderRoute iPhone and iPad app handles rides, location, purchases and video.",
    alternates: {
      canonical: `${ru ? "https://ru.spiderroute.com" : "https://spiderroute.com"}/ios/privacy`,
      languages: {
        en: "https://spiderroute.com/ios/privacy",
        ru: "https://ru.spiderroute.com/ios/privacy",
      },
    },
  };
}

export default async function IOSPrivacy() {
  const ru = (await headers()).get("host")?.startsWith("ru.");
  return (
    <main className="legal">
      <a href="/"><Brand /></a>
      <h1>{ru ? "Конфиденциальность приложения SpiderRoute" : "SpiderRoute iOS Privacy Policy"}</h1>
      <p>{ru ? "Обновлено 18 октября 2026 г. Эта страница относится к приложению SpiderRoute для iPhone и iPad (com.wowcoded.speedometergps). Для сайта действует отдельная политика." : "Updated October 18, 2026. This policy covers the SpiderRoute app for iPhone and iPad (com.wowcoded.speedometergps). The SpiderRoute website has a separate privacy policy."}</p>

      <h2>{ru ? "Маршруты и местоположение" : "Rides and location"}</h2>
      <p>{ru ? "Приложение использует разрешение на геолокацию для показа текущей скорости и положения, записи поездки и восстановления маршрута после прерывания. Если вы начали запись, она может продолжаться, когда открыт другой экран или телефон заблокирован. Подтвержденные точки маршрута сохраняются на устройстве. Импортированные маршруты и путеводители также хранятся локально. Они не загружаются автоматически на сайт SpiderRoute и не передаются другим пользователям." : "The app uses location permission to show your live speed and position, record a ride, and recover a recording after an interruption. A ride you start may continue recording while another app is open or your phone is locked. Confirmed route points are stored on your device. Imported routes and guides are stored locally too. The app does not automatically upload them to the SpiderRoute website or share them with other users."}</p>
      <p>{ru ? "Если вы включите синхронизацию iCloud, сохраненные поездки копируются в ваш личный контейнер iCloud Documents под управлением Apple. Вы можете оставить синхронизацию выключенной, удалить отдельные поездки или очистить историю в приложении. Маршрут экспортируется только по вашему выбору через «Поделиться» или «Сохранить в Файлы». Выбранное приложение или сервис обрабатывает файл согласно своим условиям." : "If you enable iCloud sync, saved rides are copied to your private iCloud Documents container managed by Apple. You can leave sync off, delete individual rides, or clear ride history in the app. A route is exported only when you choose Share or Save to Files. The destination app or service you select handles the exported file under its own terms."}</p>

      <h2>{ru ? "Движение, карта и ссылки" : "Motion, maps and links"}</h2>
      <p>{ru ? "С разрешения «Движение и фитнес» приложение добавляет к поездкам сведения о типе активности. В зависимости от выбранного провайдера используются Apple MapKit или данные OpenStreetMap с серверов OpenFreeMap. Запросы карты передают выбранному провайдеру ваш IP-адрес и запрошенную область карты. При загрузке офлайн-карт приложение также запрашивает у OpenFreeMap тайлы, стили, шрифты и значки. Загруженные карты хранятся на устройстве; удалить их можно в настройках. Apple и OpenFreeMap обрабатывают запросы согласно своим политикам конфиденциальности. Если вы откроете ссылку на источник из импортированного путеводителя, ваш браузер обратится к выбранному сайту." : "With Motion & Fitness permission, the app adds activity context to rides. Depending on the selected provider, maps use Apple MapKit or OpenStreetMap data served by OpenFreeMap. Map requests disclose your IP address and the requested map area to the selected provider. Offline map downloads also contact OpenFreeMap for map tiles, styles, fonts and icons. Downloaded maps are stored on your device and can be removed in Settings. Apple and OpenFreeMap process requests under their own privacy terms. If you open a source link from an imported guide, your browser contacts that destination."}</p>

      <h2>{ru ? "Удаленная камера" : "Remote Camera"}</h2>
      <p>{ru ? "Дополнительная функция Remote Camera связывает два ваших телефона по локальной сети для управления записью. Видео и звук, если он включен, остаются на телефоне-камере; видео может быть сохранено в Фото с вашего разрешения. Приложение не отправляет видео на сервер SpiderRoute." : "The optional Remote Camera feature pairs two of your phones over a local connection to control recording. Video and, when enabled, sound stay on the camera phone; a video can also be saved to Photos with your permission. The app does not send video to a SpiderRoute server."}</p>

      <h2>{ru ? "Покупки и связь с нами" : "Purchases and contact"}</h2>
      <p>{ru ? "Подписка и разовая покупка обрабатываются Apple через App Store и StoreKit. Apple может передавать нам сведения о состоянии покупки для управления доступом; они не содержат ваших маршрутов или видео. Для пользования приложением не нужна учетная запись SpiderRoute. Мы не используем данные приложения для рекламы или отслеживания между приложениями." : "Apple processes subscriptions and lifetime purchases through the App Store and StoreKit. Apple may send us purchase-status information to help manage access; it does not contain your routes or videos. You do not need a SpiderRoute account to use the app. We do not use app data for advertising or cross-app tracking."}</p>
      <p>{ru ? "Если вы напишете в поддержку, мы используем ваше сообщение и адрес электронной почты для ответа. Вопросы о данных или удалении можно отправить на hello@spiderroute.com. Данные на устройстве удаляются через функции приложения или при удалении приложения; копиями в iCloud можно управлять также через настройки Apple." : "If you contact support, we use your message and email address to reply. For data or deletion questions, email hello@spiderroute.com. On-device data can be deleted in the app or by removing the app; iCloud copies can also be managed through Apple's settings."}</p>
      <a href="mailto:hello@spiderroute.com">hello@spiderroute.com</a>
    </main>
  );
}
