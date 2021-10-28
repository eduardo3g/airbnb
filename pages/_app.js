import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Router from "next/router";

import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start); // start loader when user moves to another page
Router.events.on("routeChangeComplete", progress.finish); // stop loader when the destination page loads
Router.events.on("routeChangeError", progress.finish); // stop loader if the destination page fails to load

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
