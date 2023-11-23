import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
      />
      <Script
        id="google-analytics-html"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}', {

                      });
                    `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
