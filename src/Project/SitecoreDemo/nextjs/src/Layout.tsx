import Head from 'next/head';
import { useEffect } from 'react';
import {
  Placeholder,
  LayoutServiceData,
  VisitorIdentification,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';

type LayoutProps = {
  layoutData: LayoutServiceData;
};

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { updateSitecoreContext } = useSitecoreContext({ updatable: true });

  // Update Sitecore Context if layoutData has changed (i.e. on client-side route change).
  // Note the context object type here matches the initial value in [[...path]].tsx.
  useEffect(() => {
    const context: StyleguideSitecoreContextValue = {
      route: layoutData.sitecore.route,
      itemId: layoutData.sitecore.route.itemId,
      ...layoutData.sitecore.context,
    };
    updateSitecoreContext && updateSitecoreContext(context);
  }, [layoutData]);

  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <Placeholder name="head" rendering={route} />

        <link
          href="/-/media/Feature/Experience-Accelerator/Bootstrap/Bootstrap/Styles/optimized-min.css?t=20210629T222947Z"
          rel="stylesheet"
        />
        <link
          href="/-/media/Base-Themes/Core-Libraries/styles/optimized-min.css?t=20210629T222952Z"
          rel="stylesheet"
        />
        <link
          href="/-/media/Base-Themes/Main-Theme/styles/optimized-min.css?t=20210629T222956Z"
          rel="stylesheet"
        />
        <link
          href="/-/media/Themes/Demo-SXA-Sites/Lighthouse/styles/pre-optimized-min.css?t=20150515T071943:635672711833756301Z"
          rel="stylesheet"
        />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />

      <Placeholder name="body-top" rendering={route} />
      <div id="wrapper">
        <header>
          <div id="header">
            <Placeholder name="header" rendering={route} />
          </div>
        </header>
        <main>
          <div id="content">
            <div className="row">
              <Placeholder name="main" rendering={route} />
            </div>
          </div>
        </main>
        <footer>
          <div id="footer">
            <div className="row">
              <Placeholder name="footer" rendering={route} />
            </div>
          </div>
        </footer>
      </div>
      <Placeholder name="body-bottom" rendering={route} />

      <script src="/-/media/Base-Themes/Core-Libraries/scripts/optimized-min.js?t=20210629T222951Z"></script>
      <script src="/-/media/Base-Themes/XA-API/Scripts/optimized-min.js?t=20210629T222953Z"></script>
      <script src="/-/media/Base-Themes/Main-Theme/scripts/optimized-min.js?t=20210629T222955Z"></script>
      <script src="/-/media/Base-Themes/Google-Maps-JS-Connector/Scripts/optimized-min.js?t=20210629T222957Z"></script>
      <script src="/-/media/Base-Themes/Maps/Scripts/optimized-min.js?t=20210629T222958Z"></script>
      <script src="/-/media/Base-Themes/SearchTheme/Scripts/optimized-min.js?t=20210629T223000Z"></script>
      <script src="/-/media/Base-Themes/Components-Theme/Scripts/optimized-min.js?t=20210629T223002Z"></script>
      <script src="/-/media/Base-Themes/Resolve-Conflicts/Scripts/optimized-min.js?t=20210629T223002Z"></script>
      <script src="/-/media/Themes/Demo-SXA-Sites/Lighthouse/scripts/pre-optimized-min.js?t=20150515T071943:635672711833756301Z"></script>
    </>
  );
};

export default Layout;
