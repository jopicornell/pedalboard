import postgres from 'postgres'

const sql = postgres() // will use psql environment variables

process.on('SIGTERM', async () => {
    await sql.end()
})

export default sql
