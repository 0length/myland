// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchContent } from '../[slug]'

type Res = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  console.log(req.url!)
  res.status(200).json({data: await fetchContent(req.url!.split("/api/").join("/"))})
}
