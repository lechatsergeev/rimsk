import HomePage from "./HorecaPage";
import CertificatesPage from "./CertificatesPage";
import ContactsPage from "./ContactsPage";
import DeliveryPage from "./DeliveryPage";
import { normalizeRoutePath } from "./routes";

export default function App() {
  const route =
    typeof window === "undefined" ? "/" : normalizeRoutePath(window.location.pathname);

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
