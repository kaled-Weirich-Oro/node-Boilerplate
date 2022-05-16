import Router from 'koa-router';

export const router = new Router();

router.get('/ping', ctx => {
    return ctx.body = {ping: "pong"}
})