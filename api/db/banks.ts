import { Bank } from 'types'
import sql from './postgres'

export async function selectBanks() {
    const banks = await sql`
        SELECT b.id              AS bank_id,
               b.name            AS bank_name,
               btn.id            AS button_id,
               btn.position      AS button_position,
               btn.name          AS button_name,
               btn.type          AS button_type,
               btn.controller    AS button_controller,
               btn.channel       AS button_channel,
               btn.bank_id       AS button_bank_id,
               sm.sweep_id       AS sweep_id,
               s.name            AS sweep_name,
               s.controller      AS sweep_controller,
               s.channel         AS sweep_channel,
               s.min             AS sweep_min,
               s.max             AS sweep_max,
               s.curve           AS sweep_curve,
               s.pedal           AS sweep_pedal,
               s.value           AS sweep_value,
               m.id              AS message_id,
               m.channel         AS message_channel,
               m.controller      AS message_controller,
               m.type            AS message_type,
               m.value           AS message_value,
               bm.message_id     AS button_message_id,
               bm_on.message_id  AS on_message_id,
               m_on.channel      AS on_message_channel,
               m_on.controller   AS on_message_controller,
               m_on.type         AS on_message_type,
               m_on.value        AS on_message_value,
               bm_off.message_id AS off_message_id,
               m_off.channel     AS off_message_channel,
               m_off.controller  AS off_message_controller,
               m_off.type        AS off_message_type,
               m_off.value       AS off_message_value
        FROM bank b
                 LEFT JOIN button btn ON b.id = btn.bank_id
                 LEFT JOIN button_sweep sm ON btn.id = sm.button_id
                 LEFT JOIN sweep s ON sm.sweep_id = s.id
                 LEFT JOIN button_message bm ON btn.id = bm.button_id
                 LEFT JOIN midi_message m ON bm.message_id = m.id
                 LEFT JOIN button_on_message bm_on ON btn.id = bm_on.button_id
                 LEFT JOIN midi_message m_on ON bm_on.message_id = m_on.id
                 LEFT JOIN button_off_message bm_off ON btn.id = bm_off.button_id
                 LEFT JOIN midi_message m_off ON bm_off.message_id = m_off.id
        order by btn.bank_id, btn.position
    `;

    return banks.reduce<Bank[]>((acc, row) => {
        let bank = acc.find(b => b.id === row.bank_id);
        if (!bank) {
            bank = { id: row.bank_id, name: row.bank_name, buttons: [] };
            acc.push(bank);
        }
        let button = bank.buttons.find(b => b.id === row.button_id)
        if (!button) {
            button = {
                id: row.button_id,
                position: row.button_position,
                name: row.button_name,
                type: row.button_type,
                controller: row.button_controller,
                channel: row.button_channel,
                sweeps: [],
                onMessages: [],
                offMessages: []
            };
            bank.buttons.push(button);
        }
        if (row.sweep_id) {
            button.sweeps?.push({
                id: row.sweep_id,
                name: row.sweep_name,
                controller: row.sweep_controller,
                channel: row.sweep_channel,
                min: row.sweep_min,
                max: row.sweep_max,
                curve: row.sweep_curve,
                pedal: row.sweep_pedal,
                value: row.sweep_value
            });
        }
        if (row.on_message_id && 'onMessages' in button) {
            button.onMessages?.push({
                id: row.on_message_id,
                channel: row.on_message_channel,
                controller: row.on_message_controller,
                type: row.on_message_type,
                value: row.on_message_value
            });
        }
        if (row.off_message_id && 'offMessages' in button) {
            button.offMessages?.push({
                id: row.off_message_id,
                channel: row.off_message_channel,
                controller: row.off_message_controller,
                type: row.off_message_type,
                value: row.off_message_value
            });
        }
        return acc;
    }, []);
}

export async function createBank(bank: Bank) {
    await sql.begin(async sql => {
        const [{ id }] = await sql`
            INSERT INTO bank (name)
            VALUES (${bank.name})
            RETURNING id
        `;
        for (const button of bank.buttons) {
            if ('controller' in button) {
                await sql`
                    INSERT INTO button (bank_id, name, type, controller, channel, position)
                    VALUES (${id}, ${button.name}, ${button.type}, ${button.controller}, ${button.channel},
                            ${button.position})
                `;
            } else {
                await sql`
                    INSERT INTO button (bank_id, name, type, position)
                    VALUES (${id}, ${button.name}, ${button.type}, ${button.position})
                `;
            }
        }
    })

}

export async function updateBank(bank: BankWithId) {
    await sql.begin(async sql => {
        await sql`
            UPDATE bank
            SET name = ${bank.name}
            WHERE id = ${bank.id}
        `;
        for (const button of bank.buttons) {
            if ('controller' in button) {
                if (button.id) {
                    await sql`
                        UPDATE button
                        SET name       = ${button.name},
                            type       = ${button.type},
                            controller = ${button.controller},
                            channel    = ${button.channel},
                            position   = ${button.position}
                        WHERE id = ${button.id}
                    `;
                } else {
                    await sql`
                        INSERT INTO button (bank_id, name, type, controller, channel, position)
                        VALUES (${bank.id}, ${button.name}, ${button.type}, ${button.controller}, ${button.channel},
                                ${button.position})
                    `;
                }
            } else {
                if (button.id) {
                    await sql`
                        UPDATE button
                        SET name     = ${button.name},
                            type     = ${button.type},
                            position = ${button.position}
                        WHERE id = ${button.id}
                    `;
                } else {
                    await sql``
                }
            }
            if (button.sweeps !== undefined) {
                await sql`
                    DELETE
                    FROM button_sweep
                    WHERE button_id = ${button.id}
                `;
                for (const sweep of button.sweeps) {
                    if (sweep.id) {
                        await sql`
                            INSERT INTO button_sweep (button_id, sweep_id)
                            VALUES (${button.id}, ${sweep.id})
                            ON CONFLICT DO NOTHING
                        `;
                    }
                }
            }
        }
    })
}
