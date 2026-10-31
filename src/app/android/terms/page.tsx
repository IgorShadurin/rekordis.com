import type { Metadata } from "next";
import { Brand } from "@/components/Brand";

export const metadata: Metadata = {
  title: { absolute: "Rekordis Android Terms of Use" },
  description: "Terms for using Rekordis on Android and its optional Plus purchases.",
  alternates: { canonical: "https://rekordis.com/android/terms" },
};

export default function AndroidTerms() {
  return <main className="legal" lang="en">
    <a href="/"><Brand /></a>
    <h1>Rekordis Android Terms of Use</h1>
    <p>Updated October 31, 2026. These terms cover Rekordis for Android (com.wowcoded.rekordis). For assistance, contact <a href="mailto:support@yumcut.com">support@yumcut.com</a>.</p>
    <h2>Using Rekordis</h2>
    <p>Rekordis helps you record and view activities and create sports photos and videos. Use it only where lawful and safe. Check your surroundings and applicable access rules; maps, positioning and measurements can be incomplete or inaccurate. Do not operate the app when doing so would distract you from driving or another activity requiring your attention.</p>
    <p>Calories and other calculated measurements are estimates, even when artwork displays a number without an approximation symbol. Rekordis is not a medical device and does not provide diagnosis, treatment or emergency navigation. Features and export resolutions depend on your device, permissions and available resources.</p>
    <h2>Your content</h2>
    <p>You retain your rights in the routes, photos, videos and other content you provide. Only use content and images of people that you have permission to use. Choosing to export or share may disclose activity measurements or locations shown in the result. Review the composition and choose an appropriate recipient before sharing. Recipient services apply their own terms.</p>
    <h2>Free features and Plus</h2>
    <p>The app identifies features that require Plus before purchase. Camera and gallery entry, sports artwork and standard export are available without Plus; recording new activities, offline maps, watermark removal and 4K export require eligible Plus access. Available features may change with app updates, subject to applicable law and the terms of existing purchases.</p>
    <p>Google Play displays the applicable product, localized price, billing period and any eligible introductory offer before you confirm. Monthly and yearly subscriptions renew automatically unless canceled through Google Play. If an eligible free trial is offered, the purchase screen explains its duration and subsequent charge. A lifetime purchase is a one-time purchase of the app’s Plus entitlement, not a subscription.</p>
    <p>Manage or cancel subscriptions in Google Play. Uninstalling Rekordis does not cancel a subscription. Refund requests follow Google Play’s rules and applicable consumer law. Restore access using the Google Play account that owns the purchase; an internet connection can be necessary to verify it. Access can end when a purchase expires, is refunded or revoked. Existing saved content is not deleted solely because Plus access ends.</p>
    <h2>Availability and privacy</h2>
    <p>Third-party map, health and payment services may change or become unavailable. Keep your own copies of important exports. We do not guarantee uninterrupted service or perfect measurements; nothing in these terms excludes rights or remedies that cannot lawfully be excluded.</p>
    <p>Our <a href="/android/privacy">Android Privacy Policy</a> explains permissions, local processing, service providers and deletion controls. Questions about these terms can be sent to <a href="mailto:support@yumcut.com">support@yumcut.com</a>.</p>
  </main>;
}
