import type {Metadata} from "next";

const FALLBACK_ORIGIN="https://shopee-sync-manager.jtpgjmdaj587456325.chatgpt.site";
const cleanOrigin=(value:string)=>value.replace(/\/+$/,"");

export const SITE_ORIGIN=cleanOrigin(process.env.NEXT_PUBLIC_SITE_URL||FALLBACK_ORIGIN);
export const CANONICAL_ORIGIN=cleanOrigin(process.env.NEXT_PUBLIC_CANONICAL_URL||SITE_ORIGIN);
export const SEO_INDEXABLE=process.env.NEXT_PUBLIC_SEO_INDEXABLE!=="false";
export const canonicalUrl=(path="/")=>new URL(path,CANONICAL_ORIGIN).toString();
export const siteUrl=(path="/")=>new URL(path,SITE_ORIGIN).toString();
export const jsonLd=(value:unknown)=>JSON.stringify(value).replace(/</g,"\\u003c");

type MarketingMetadataInput={path:string;title:string;description:string;keywords?:string[];image?:boolean;type?:"website"|"article"};
export function marketingMetadata({path,title,description,keywords,image=true,type="website"}:MarketingMetadataInput):Metadata{
 const fullTitle=title.includes("DOCK")?title:`${title} | DOCK`,images=image?[{url:siteUrl("/og.png"),width:1200,height:630,alt:"DOCK｜Shopee出品・価格・在庫管理をひとつに"}]:[];
 return {title,description,keywords,alternates:{canonical:canonicalUrl(path)},robots:{index:SEO_INDEXABLE,follow:SEO_INDEXABLE},openGraph:{title:fullTitle,description,type,locale:"ja_JP",siteName:"DOCK",url:canonicalUrl(path),images},twitter:{card:images.length?"summary_large_image":"summary",title:fullTitle,description,images}};
}
