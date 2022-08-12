import { CreatePage } from ".";
import { notion, toBlockId } from "./blog/[slug]";


(String.prototype as any).insert = function(index: number, string: string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };
  // @ts-ignore
const toPageID = (string: string)=>toBlockId(string).insert(8, "-").insert(13, "-").insert(18,"-").insert(23,"-");
const Home = CreatePage("home")
Home.getInitialProps = async (): Promise<{}> => {
    const props: { [index: string]: any } = {};

    const highlightDb = await notion.blocks.children.list({
        block_id:toPageID("highlights-8bec591dfbd54e5e8fd4cbdc0696eeea"),
    });
    // @ts-ignore
    props.data = await Promise.all(highlightDb.results.map(async ({link_to_page:{page_id}})=>{
       const page: any = await notion.pages.retrieve({page_id});
       const block_url = page.url.split("https://www.notion.so/").join("")
       const firstChild: any = await notion.blocks.children.list({
        block_id: toPageID(block_url),
        page_size: 2,
      });
       return {
        title:firstChild.results[0].heading_1.rich_text[0].plain_text,
        date:page.created_time,
        img_url: page.cover.external?.url,
        block_url
       }
    }));
    return props;
};
export default Home