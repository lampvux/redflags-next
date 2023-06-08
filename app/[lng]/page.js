import { useTranslation } from "../i18n";

export default async function Home({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          {t("login")}
        </button>
      </div>
    </main>
  );
}
