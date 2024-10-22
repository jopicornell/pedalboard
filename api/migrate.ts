import shift from 'postgres-shift'
import postgres from 'postgres'
import { fileURLToPath } from 'url'

const sql = postgres({
    idle_timeout: 1
})

shift({
    sql,
    path: fileURLToPath(new URL('migrations', import.meta.url)),
    before: ({
                 migration_id,
                 name
             }) => {
        console.log('Migrating', migration_id, name)
    }
})
    .then(() => console.log('All good'))
    .catch(err => {
        console.error('Failed', err)
        process.exit(1)
    })
