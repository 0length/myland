import { Client } from "@notionhq/client";
import { CreatePage } from ".";
const FIRST_PATH = "blog";
export const createNotionInstance = () =>
  new Client({
    auth:
      process.env.NOTION_TOKEN ||
      "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw",
  });
export const toBlockId = (a: string) => a.split("-")[a.split("-").length - 1];
export const fetchContent = async (url: string) => {
  const notion = createNotionInstance();
  const block_id_not_found = toBlockId(
    "404-Not-Found-8da10e78ecef4bf88140fd17b60e8379"
  );
  const block_id = toBlockId(url.split(`/`)[1]);

  try {
    const page = await notion.pages.retrieve({ page_id: block_id });

    const content = await await (
      await fetch("https://notion-api.splitbee.io//v1/page/" + block_id, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw",
        },
      })
    ).json();
    const author = await notion.users.retrieve({
      user_id: (page as any).created_by.id,
    });
    const block: any = await notion.blocks.retrieve({
      block_id,
    });
    const firstChild = await notion.blocks.children.list({
      block_id,
      page_size: 2,
    });
    let parent_page_title;
    if (block.parent.type === "page_id") {
      parent_page_title = (
        (await notion.blocks.retrieve({
          block_id: block.parent[block.parent.type],
        })) as any
      ).child_page.title;
    }
    if (block.parent.type === "workspace") {
      parent_page_title = "Workspace  ";
    }
    return { page, content, author, block: {...block, parent_page_title}, firstChild };
  } catch (error) {
    const block_id = block_id_not_found;
    const page = await notion.pages.retrieve({ page_id: block_id_not_found });

    const content = await await (
      await fetch(
        "https://notion-api.splitbee.io//v1/page/" + block_id_not_found,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw",
          },
        }
      )
    ).json();
    const author = await notion.users.retrieve({
      user_id: (page as any).created_by.id,
    });
    const block = await notion.blocks.retrieve({
      block_id,
    });
    const firstChild = await notion.blocks.children.list({
      block_id,
      page_size: 2,
    });
    return { page, content, author, block, firstChild };
  }
};

const Blog = CreatePage(FIRST_PATH);
Blog.getInitialProps = async (ctx): Promise<{}> => {
  const props: { [index: string]: any } = {};
  if (typeof window === "undefined" && ctx.req?.url) {
    props.data = await fetchContent(ctx.req.url);
  } else {
    console.log(ctx, "ctx")
    props.data = (await (await fetch("/api/".concat(ctx.asPath!.split("/")[1]))).json()).data
  }
  return props;
};

export default Blog;
