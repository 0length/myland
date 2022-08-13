// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchHighlights } from '../home'

type Res = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  res.status(200).json({data: await fetchHighlights()})
}
