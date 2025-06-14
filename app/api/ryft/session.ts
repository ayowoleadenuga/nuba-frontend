// pages/api/ryft/session.ts
import type { NextApiRequest, NextApiResponse } from "next";
// import apis, { nubaApis } from '@/services/api-services';

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, currency } = req.body;

  //   try {
  //     // const session = await apis.ryft.createPaymentSession({ amount, currency  });
  //     const sessions = nubaApis
  //     res.status(200).json({ clientSecret: session.clientSecret });
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message || 'Server error' });
  //   }
};
