import "datatables.net-dt/css/dataTables.dataTables.css";
import "./globals.css";
import Link from "next/link";
import MatomoTagManager from "./components/MatomoTagManager";

export const metadata = {
  title: "Zodiac",
  description:
    "Track ingest of packages and fix errors for born digital and digitized content.",
};

export default function Template({ children }) {
  return (
    <html lang="en">
      <head>
        <MatomoTagManager />
      </head>
      <body>
        <div id="root">
          <Link href="#main" className="skip-link">
            Skip to main content
          </Link>
          <header className="header header--blue">
            <div className="wrapper">
              <div className="container flex header__container">
                <div className="header__brand header__brand--text">
                  <Link href="/" className="header__brand-title">
                    Zodiac
                  </Link>
                  <div className="header__brand-subtitle">
                    Track packages and troubleshoot errors
                  </div>
                </div>
                <nav className="nav-right" aria-label="Main">
                  <div className="nav__list">
                    <div className="nav__item btn--navy">
                      <Link className="nav__link" href="/errors">
                        Package Errors
                        <span className="material-icon" aria-hidden="true">
                          arrow_right_alt
                        </span>
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <div className="container grid">
            <main id="main">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
