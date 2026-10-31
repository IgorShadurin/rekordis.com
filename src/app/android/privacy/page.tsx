import type { Metadata } from "next";
import { Brand } from "@/components/Brand";

export const metadata: Metadata = {
  title: { absolute: "Rekordis Android Privacy Policy" },
  description: "How Rekordis for Android handles location, workouts, photos, videos and purchases.",
  alternates: { canonical: "https://rekordis.com/android/privacy" },
};

export default function AndroidPrivacy() {
  return <main className="legal" lang="en">
    <a href="/"><Brand /></a>
    <h1>Rekordis Android Privacy Policy</h1>
    <p>Updated October 31, 2026. This policy covers Rekordis for Android (com.wowcoded.rekordis). Contact us about privacy or deletion at <a href="mailto:support@yumcut.com">support@yumcut.com</a>. The <a href="/privacy">website privacy policy</a> separately covers visits to this website.</p>

    <h2>Location and activities</h2>
    <p>With your permission, Rekordis uses location to display your position and speed and to record activities you start. An active recording can continue in a foreground location service while the screen is locked, with an ongoing notification. Recording stops when you end it. Motion permission helps classify activity during recording. Denying motion permission does not prevent GPS recording.</p>
    <p>Recorded and imported activities, route files and settings are stored on your device. Rekordis does not automatically upload your activity archive to our website or a Rekordis server. The Android app does not require a Rekordis account and disables its own operating-system cloud backup and device-transfer backup.</p>

    <h2>Maps and place names</h2>
    <p>Online maps and offline map downloads request tiles, map styles, fonts and icons from OpenFreeMap. Requests disclose your IP address, app version and the map areas requested; those areas may reveal location. Rekordis does not send the full recorded track to the map service. Downloaded maps remain on your device until removed.</p>
    <p>To name an activity, the system geocoder can receive up to 12 selected route coordinates, including endpoints and intermediate places. Its provider depends on your device. Derived place names are cached locally. Providers process network requests under their own privacy terms. See <a href="https://openfreemap.org/privacy/">OpenFreeMap privacy</a> and your device provider’s privacy information. OpenFreeMap reports limited network/security logging with retention described in that policy.</p>

    <h2>Photos, videos and effects</h2>
    <p>You choose when to open the camera or select media with the system picker. Camera permission enables capture; microphone permission enables recorded sound when used. Media processing and effect rendering happen on your device. Face landmarks and person masks are used to position visual effects, not to identify you. Rekordis does not upload your photos, videos or these analysis results to a rendering server.</p>
    <p>Some effects use Google ML Kit. Google states that its input media and analysis outputs remain on-device. The SDK does send technical diagnostics and usage metrics to Google, including device and app information, installation identifiers, performance, API configuration, input/output sizes, feature events and errors. These requests use HTTPS. See <a href="https://developers.google.com/ml-kit/terms">ML Kit privacy information</a> and <a href="https://policies.google.com/privacy">Google’s privacy policy</a>. This technical telemetry is separate from your images and workout data.</p>
    <p>Working media and exports are stored in local app files or cache while needed for editing and sharing. Closing an editor or finishing a share allows cleanup of its temporary files; files left after an interruption can remain until subsequent cleanup or app storage is cleared. Saved results in your gallery or a destination you choose remain there until you delete them.</p>

    <h2>Optional Health Connect import</h2>
    <p>Health Connect is an optional source for sports artwork. After you select that source and grant permission, Rekordis reads exercise sessions and their available distance and active calories. The picker is limited to recent sessions. A workout route is requested separately only when you choose to include it. The app does not write Health Connect data or request medical records, heart rate, daily steps, age, sex, height or weight from Health Connect.</p>
    <p>The selected workout is used locally in your current composition. It is not automatically added to the activity archive or uploaded to our servers. Health data is not used for advertising or sold. You can edit or omit the displayed measurements before exporting. When you choose Save or Share, visible workout measurements and any route become part of that photo or video. Gallery backup and recipient apps may then process the result according to your settings and their policies.</p>
    <p>You can revoke access in Health Connect settings. Declining access leaves local activities and manual editing available. Revoking access does not remove media you already exported.</p>

    <h2>Optional weight and estimates</h2>
    <p>You may save your weight locally to estimate calories when an activity has no recorded energy value. The estimate uses weight, activity type and duration; it is informational, not a medical measurement. You can edit or reset weight in Settings. Editing displayed measurements does not modify the original route or health record.</p>

    <h2>Purchases</h2>
    <p>Google Play handles purchases, subscriptions and payment details. Rekordis receives product identifiers, signed purchase records and purchase status to verify Plus access on your device and acknowledge purchases through Google Play. Rekordis does not receive your card details or send purchase receipts to a separate Rekordis verification server. Google processes payment information under its own terms and privacy policy. Subscription management and cancellation are available through Google Play.</p>

    <h2>Sharing and external services</h2>
    <p>Sharing occurs only after you choose it. The system share sheet provides the selected file and a Rekordis attribution caption without a URL. You choose the recipient; it may ignore the caption. Rekordis does not automatically post to social accounts. Opening external links or the native store review flow uses the destination service under its own terms. The app does not include an advertising SDK or sell your personal information.</p>

    <h2>Retention, controls and deletion</h2>
    <p>You can remove local activities and downloaded maps using the app’s controls, reset the optional weight, and revoke location, motion, camera, microphone or Health Connect access in system settings. Clearing Rekordis app storage or uninstalling removes its private local data. Files already saved to the gallery, exported, shared or backed up by another service must be deleted in those locations separately.</p>
    <p>If you email support, we receive the address and information you choose to send and use them to answer and resolve your request. Do not attach private routes, health information or media unless necessary for your request. Ask for deletion of support correspondence at <a href="mailto:support@yumcut.com">support@yumcut.com</a>; we will address the request and explain any retention needed to resolve an ongoing issue or meet legal obligations. Provider-managed payment records and SDK/network logs follow the respective providers’ retention and deletion policies.</p>
    <p>We may update this policy when the app’s data handling changes. The date above identifies the current version.</p>
    <p><a href="/android/terms">Terms of Use</a></p>
  </main>;
}
