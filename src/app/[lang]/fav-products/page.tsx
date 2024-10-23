import ImageFallback from "@/helpers/ImageFallback";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { getListPage } from "@/lib/contentParser"; // Utility to fetch multiple files
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import { RegularPage } from "@/types";
import path from "path";

const FavProducts = ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  
  // Fetch all products data
  const products = getAllFilesFrontMatter(path.join(language.contentDir, "fav-products")); 

  return (
    <>
      <SeoMeta
        title="My Favorite Products"
        description="A list of my favorite products, each one carefully selected."
      />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              <h2 className="h3 mb-6">My Favorite Products</h2>

              <div className="row">
                {/* Iterate over each product and render a card */}
                {products.map((product) => (
                  <div key={product.slug} className="col-md-4 mb-4">
                    <div className="card">
                      {product.frontmatter.image && (
                        <ImageFallback
                          className="card-img-top"
                          src={product.frontmatter.image}
                          width={300}
                          height={200}
                          alt={product.frontmatter.title}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">
                          {markdownify(product.frontmatter.title)}
                        </h5>
                        <p className="card-text">
                          {markdownify(product.frontmatter.description)}
                        </p>
                        <Link href={product.frontmatter.link}>
                          <a className="btn btn-primary" target="_blank">Learn More</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FavProducts;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
