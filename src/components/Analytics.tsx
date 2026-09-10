import Script from "next/script";
import { GA_ID, GTM_ID, USE_GA4_DIRECT, USE_GTM } from "@/lib/site-config";

/**
 * Loads GTM when NEXT_PUBLIC_GTM_ID is set, otherwise GA4 directly when
 * NEXT_PUBLIC_GA_ID is set. With neither configured this renders nothing at
 * all — no empty script tags, no console noise, no layout impact.
 *
 * The dataLayer is always initialised so analytics.ts can queue events that a
 * tag manager added later will still pick up.
 */
export function Analytics() {
  if (!USE_GTM && !USE_GA4_DIRECT) return null;

  return (
    <>
      <Script id="gd-datalayer" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>

      {USE_GTM && (
        <Script id="gd-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {USE_GA4_DIRECT && (
        <>
          <Script
            id="gd-ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="gd-ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}

/** GTM's <noscript> iframe. Rendered first inside <body> when GTM is on. */
export function AnalyticsNoScript() {
  if (!USE_GTM) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
