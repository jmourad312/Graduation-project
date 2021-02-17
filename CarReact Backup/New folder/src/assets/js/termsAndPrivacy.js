import Privacy from "../../pages/user/info/privacy/Privacy";
import TermsOfService from "../../pages/user/info/termsOfService/TermsOfService";

const termsAndPrivacy = {
  terms: {
    heading: "الشروط والأحكام",
    title:
      "نرحب بكم في صفحة الشروط والأحكام. لأننا نهتم بحقوقكم، نرجو منكم قراءة هذه الشروط بعناية قبل استخدام الموقع.",
    content: <TermsOfService />,
  },
  privacy: {
    heading: "سياسة الخصوصية",
    title: "نظره عامه",
    content: <Privacy />,
  },
};

export default termsAndPrivacy;