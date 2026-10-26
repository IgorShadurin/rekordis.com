import { brandKeywords } from "@/lib/brand-metadata";
import { redirect } from "next/navigation";
import { workspaceAccount, workspaceHomePath } from "@/server/workspace-page";
import { getProfile } from "@/server/profiles";
import { ProfileEditor } from "@/components/ProfileEditor";
export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const { locale = "en" } = await workspaceAccount();
  return {
    title: {
      absolute:
        locale === "ru"
          ? "Настройки профиля · Рекордис"
          : "Profile settings · Rekordis",
    },
    keywords: brandKeywords(locale),
    robots: { index: false, follow: false },
  };
}
export default async function SettingsPage() {
  const account = await workspaceAccount();
  if (!account.id) redirect("/workspace");
  return (
    <ProfileEditor
      initial={getProfile(account.id)}
      ru={account.locale === "ru"}
      homeHref={await workspaceHomePath()}
    />
  );
}
