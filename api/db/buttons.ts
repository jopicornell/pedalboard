import sql from './postgres'
import { Button, ButtonWithId } from 'types';

export async function insertButton(bankId: number, button: Button) {
    let id: number;
    if (button.type === 'effect' || button.type === 'trigger' || button.type === 'program') {
        [{ id }] = await sql`
            INSERT INTO button (bank_id, name, type, controller, channel, position)
            VALUES (${bankId}, ${button.name}, ${button.type}, ${button.controller}, ${button.channel},
                    ${button.position})
            RETURNING id
        `;
    } else {
        [{ id }] = await sql`
            INSERT INTO button (bank_id, name, type, position)
            VALUES (${bankId}, ${button.name}, ${button.type}, ${button.position})
            RETURNING id
        `;

    }

    if (button.sweeps?.length) {
        await sql`DELETE
                  FROM button_sweep
                  WHERE button_id = ${id}`;
        for (const sweep of button.sweeps) {
            if (sweep.id) {
                await sql`INSERT INTO button_sweep (button_id, sweep_id)
                          VALUES (${id}, ${sweep.id})`;
            } else {
                await sql`
                    INSERT INTO sweep (name, controller, channel, min, max, curve, pedal)
                    VALUES (${sweep.name}, ${sweep.controller}, ${sweep.channel}, ${sweep.min}, ${sweep.max},
                            ${sweep.curve}, ${sweep.pedal})
                    RETURNING id
                `;
                await sql`INSERT INTO button_sweep (button_id, sweep_id)
                          VALUES (${id}, ${sql`SELECT id
                                                      FROM sweep
                                                      WHERE name = ${sweep.name}`})`;
            }
        }
    }

    if (button.onMessages?.length) {
        for (const message of button.onMessages) {
            await sql`
                INSERT INTO button_message (button_id, message_type, controller, channel, value)
                VALUES (${id}, ${message.type}, ${message.controller}, ${message.channel}, ${message.value})
            `;
        }
    }

    return id;
}

export async function updateButton(bankId: number, button: ButtonWithId) {
    if (button.type === 'effect' || button.type === 'trigger' || button.type === 'program') {
        await sql`
            UPDATE button
            SET name       = ${button.name},
                bank_id    = ${bankId},
                type       = ${button.type},
                controller = ${button.controller},
                channel    = ${button.channel},
                position   = ${button.position}
            WHERE id = ${button.id}
        `;
    } else {
        await sql`
            UPDATE button
            SET name     = ${button.name},
                bank_id  = ${bankId},
                type     = ${button.type},
                position = ${button.position}
            WHERE id = ${button.id}
        `;
    }
}

export async function upsertButton(bankId: number, button: Button) {
    if (button.id !== undefined) {
        // @ts-expect-error id is not undefined so it complies with the type ButtonWithId
        await updateButton(bankId, button);
    } else {
        await insertButton(bankId, button);
    }

    if (button.sweeps?.length) {
        await sql`DELETE
                  FROM button_sweep
                  WHERE button_id = ${button.id}`;
        for (const sweep of button.sweeps) {
            if (sweep.id) {
                await sql`INSERT INTO button_sweep (button_id, sweep_id)
                          VALUES (${button.id}, ${sweep.id})`;
            } else {
                await sql`
                    INSERT INTO sweep (name, controller, channel, min, max, curve, pedal)
                    VALUES (${sweep.name}, ${sweep.controller}, ${sweep.channel}, ${sweep.min}, ${sweep.max},
                            ${sweep.curve}, ${sweep.pedal})
                    RETURNING id
                `;
                await sql`INSERT INTO button_sweep (button_id, sweep_id)
                          VALUES (${button.id}, ${sql`SELECT id
                                                      FROM sweep
                                                      WHERE name = ${sweep.name}`})`;
            }
        }
    }
    if (button.onMessages?.length) {
        for (const message of button.onMessages) {

        }
    }
}
