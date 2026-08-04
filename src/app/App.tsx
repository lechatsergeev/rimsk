import HomePage from "./HomePage";
import CertificatesPage from "./CertificatesPage";
import ContactsPage from "./ContactsPage";
import DeliveryPage from "./DeliveryPage";
import { normalizeRoutePath } from "./routes";

export default function App({ pathname }: { pathname?: string }) {
  // pathname приходит только из пререндера; в браузере берём текущий адрес,
  // иначе статика подстраниц собиралась бы как главная.
  const rawPath =
    pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const route = normalizeRoutePath(rawPath);

  if (route === "/delivery") {
    return <DeliveryPage />;
  }

  if (route === "/certificates") {
    return <CertificatesPage />;
  }

  if (route === "/contacts") {
    return <ContactsPage />;
  }

  return <HomePage />;
}
