import HeroSection from "../components/layout/Sections/HeroSection";
import WhatsAppChatInput from "@/components/ui/WhatsAppChatInput";

import LocationSection from "@/components/layout/Sections/LocationSection";

import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import ProductCatalog from "../components/layout/Sections/ProductCatalog";
import { CartDrawer } from "@/components/ui/CartDrawer";
import ExampleMessage from "@/components/layout/Sections/Example";

const POSTS_QUERY = `*[_type == "product"] | order(name asc) {
  ...,
  "id": _id,
  "slug": slug.current,
  "imagen_url": imagen_url.asset->url
}`;
const options = { next: { revalidate: 30 } };
export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <main
      className={`min-h-screen w-full font-base bg-background overflow-hidden`}
    >
      <HeroSection />
      {/* <RoomsSection /> */}
      {/* <ServiceSection /> */}
      {/* <PrdocutCatalog posts={posts} /> */}
      <ProductCatalog />
      {/* <HowItWorks />
      <OurStory /> */}
      <LocationSection />
      {/* <LocationSection />*/}
      {/* <Testimonials /> */}
      <CartDrawer />
      <WhatsAppChatInput />
    </main>
  );
}
