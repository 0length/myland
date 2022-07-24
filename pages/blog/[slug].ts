import { Client } from "@notionhq/client";
import { CreatePage } from ".."

(String.prototype as any).insert = function(index: number, string: string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };
  // @ts-ignore
const toPageID = (string: string)=>string.insert(8, "-").insert(13, "-").insert(18,"-").insert(23,"-");
const fetchContent = (url: string)=>{

    const block_id = toPageID(url.split("/post/")[1].split("-")[1]);


    const notion = new Client({
        auth: process.env.NOTION_TOKEN || "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw",
      })
    return notion.blocks.children.list({
        block_id,
        page_size: 500,
      });
}
const Blog = CreatePage("blog")
Blog.getInitialProps = async (ctx): Promise<{}> => {
    const props: { [index: string]: any } = {};
    if (typeof window === 'undefined' && ctx.req?.url) {
      console.log('preFetchingData', ctx.req.url);
      props.data = await fetchContent(ctx.req.url);
    } else {
      console.log('CSR, will have useEffect and loader to populate');
    }
    return props;
  };

export default Blog