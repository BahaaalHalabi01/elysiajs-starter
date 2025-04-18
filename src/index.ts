import bearer from '@elysiajs/bearer'

import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'

import { compile as c, trpc } from '@elysiajs/trpc'
import { initTRPC } from '@trpc/server'

const rpc = initTRPC.create()
const p = rpc.procedure

const router = rpc.router({
	greet: p.input(c(t.String())).query(({ input }) => input),
})

const app = new Elysia()
	.use(swagger({ path: '/docs' }))
	.use(bearer())
	.use(trpc(router))
	.get('/', () => 'Hello Elysia')
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
