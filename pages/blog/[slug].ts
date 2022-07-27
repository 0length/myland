import { Client } from "@notionhq/client";
import { CreatePage } from "..";
const FIRST_PATH = "blog";

(String.prototype as any).insert = function(index: number, string: string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };
  // @ts-ignore
const toPageID = (string: string)=>string.insert(8, "-").insert(13, "-").insert(18,"-").insert(23,"-");
const fetchContent = async (url: string)=>{
  const toBlockId = (a: string) =>a.split("-")[a.split("-").length-1]
    const block_id_not_found = toBlockId("404-Not-Found-8da10e78ecef4bf88140fd17b60e8379");
    const block_id = toBlockId(url.split(`/${FIRST_PATH}/`)[1]);


    const notion = new Client({
        auth: process.env.NOTION_TOKEN || "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw",
      })
    try {
      
      const page =  await notion.pages.retrieve({page_id: block_id});
  
      const content = await (await (await (fetch("https://notion-api.splitbee.io//v1/page/"+block_id,{
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw"
          }
        }))).json());
        // console.log(page)
        const author = await notion.users.retrieve({user_id: (page as any).created_by.id})
        console.log(author)
      return {page, content, author};
    } catch (error) {

      const page =  await notion.pages.retrieve({page_id: block_id_not_found});
  
      const content = await (await (await (fetch("https://notion-api.splitbee.io//v1/page/"+block_id_not_found,{
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw"
          }
        }))).json());
        const author = await notion.users.retrieve({user_id: (page as any).created_by.id})
        console.log(author)
      return {page, content};
    }
}

const Blog = CreatePage(FIRST_PATH)
Blog.getInitialProps = async (ctx): Promise<{}> => {
    const props: { [index: string]: any } = {};
    if (typeof window === 'undefined' && ctx.req?.url) {
      console.log('preFetchingData', ctx.req.url);
      props.data = await fetchContent(ctx.req.url);
    } else {
      console.log('CSR, will have useEffect and loader to populate');
    }
    // console.log(props.data)
    return props;
  };

export default Blog