import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
  message: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Return a simple health check response
  res.status(200).json({
    status: 'healthy',
    message: 'SAI VINAYAKA ENTERPRISES API is up and running',
    timestamp: new Date().toISOString(),
  });
}