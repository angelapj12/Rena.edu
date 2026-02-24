import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPage() {
  const t = await getTranslations("placeholder.privacy");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-light py-24 md:py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-h2 text-base-dark mb-6">{t("title")}</h1>
          <p className="text-body-lg text-base-dark/80">{t("description")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
