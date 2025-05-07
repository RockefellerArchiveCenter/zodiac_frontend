import Script from "next/script";

const MatomoTagManager = () => {
  return (
    <Script id="matomo-tag-manager">
      {`
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        (function() {
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='https://cdn.matomo.cloud/rockarch.matomo.cloud/container_cDPJweu4.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  );
};

export default MatomoTagManager;
