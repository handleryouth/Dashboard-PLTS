import { Helmet } from "react-helmet-async";
import { SeoProps } from "types";

const Seo = ({ title, description }: SeoProps) => {
  return (
    <Helmet>
      <title>{title ?? "Elektro ITS PLTS Dashboard"}</title>
      <meta name="title" content={title ?? "Elektro ITS PLTS Dashboard"} />
      <meta
        name="description"
        content={
          description ??
          "PLTS Dashboard that contains data from all PLTS in Sepuluh Nopember Institute of Technology "
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.handleryouth.xyz/" />
      <meta
        property="og:title"
        content={title ?? "Elektro ITS PLTS Dashboard"}
      />
      <meta
        property="og:description"
        content={
          description ??
          "PLTS Dashboard that contains data from all PLTS in Sepuluh Nopember Institute of Technology "
        }
      />
      <meta
        property="og:image"
        content="https://i.ibb.co/YWJyXBv/handleryouth-xyz.webp"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.handleryouth.xyz/" />
      <meta
        property="twitter:title"
        content={title ?? "Elektro ITS PLTS Dashboard"}
      />
      <meta
        property="twitter:description"
        content={
          description ??
          "PLTS Dashboard that contains data from all PLTS in Sepuluh Nopember Institute of Technology "
        }
      />
      <meta
        property="twitter:image"
        content="https://i.ibb.co/YWJyXBv/handleryouth-xyz.webp"
      />
    </Helmet>
  );
};

export default Seo;
