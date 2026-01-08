import ApiService from "./api/ApiService";
import i18n from "@/helpers/i8ln/i8ln";
import { log } from "@/helpers/Logger";

export default class TranslationService {
  static loadTranslation = async (lang: string) => {
    const url = `/translations?lang=${lang}`;

    try {
      const response = await ApiService.get(url);

      if (response.data && response.data.translations) {
        i18n.addResourceBundle(
          lang,
          "translation",
          response.data.translations,
          true,
          true
        );
        await i18n.changeLanguage(lang);

        log.info(`Translation loaded for language: ${lang}`, response.data);
        return response;
      }

      return response;
    } catch (error) {
      log.error("Error loading translation:", error);
      throw error;
    }
  };
}
