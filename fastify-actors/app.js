const fastify = require('fastify')({ logger: true })

const actors = [
    { id: 1, name: 'Tom Hanks' },
    { id: 2, name: 'Natalie Portman' }
]

fastify.get('/actors/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const actor = actors.find(actor => actor.id === id)
    if (actor) return actor
    reply.code(404).send({ error: 'Actor not found' })
})

fastify.post('/actors', async (request, reply) => {
    const newActor = request.body
    reply.code(201).send({ message: 'Actor created (not saved)', actor: newActor })
})

const start = async () => {
    try {
        await fastify.listen({ port: 8080, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
