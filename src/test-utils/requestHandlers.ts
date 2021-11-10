import { rest } from 'msw';
import { BACKEND_URL } from '../constants';

export const requestHandlers = [
  rest.post(BACKEND_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          scope: 'user:email',
          token_type: 'bearer',
          access_token: 'string',
        },
      })
    );
  }),

  rest.get('*', (req) => {
    throw new Error(`Please add handler for ${req.url.toString()}`);
  }),
];
