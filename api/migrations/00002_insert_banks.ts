import { Sql } from 'postgres';
import { Bank, MidiMessageType, Sweep } from 'types';

const sweeps = {
    Reverb: { controller: 100, channel: 1, min: 0, max: 80, name: 'Reverb', curve: 'linear', pedal: 1 },
    Delay: { controller: 101, channel: 1, min: 0, max: 100, name: 'Delay', curve: 'linear', pedal: 2 },
    Gain: { controller: 102, channel: 1, min: 0, max: 127, name: 'Gain', curve: 'linear', pedal: 1 },
    SynthGainFilter: { controller: 103, channel: 1, min: 0, max: 127, name: 'SynthGainFilter', curve: 'linear', pedal: 2 }
} as Record<string, Sweep>

const banksData: Bank[] = [
    {
        name: 'Direct Bank',
        buttons: [
            { name: 'Tap tempo', type: 'trigger', controller: 9, channel: 1 },
            { name: 'Looper rec', type: 'trigger', controller: 1, channel: 1 },
            { name: 'Looper play', type: 'trigger', controller: 2, channel: 1 },
            { name: 'Looper add', type: 'trigger', controller: 3, channel: 1 },
            { name: 'Looper stop', type: 'trigger', controller: 4, channel: 1 },
            { name: 'Looper clear', type: 'trigger', controller: 5, channel: 1 },
            { name: 'Looper reverse', type: 'effect', controller: 6, channel: 1 },
            { name: 'Looper %2', type: 'trigger', controller: 7, channel: 1 },
            {
                name: 'Looper x2',
                type: 'trigger',
                controller: 8,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 22, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 23, value: 127, type: MidiMessageType.ControlChange }
                ]
            }
        ]
    },
    {
        name: 'General Bank',
        buttons: [
            {
                name: 'Overdrive',
                type: 'effect',
                controller: 10,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 22, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 23, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            { name: 'Fuzz', type: 'effect', controller: 11, channel: 1 },
            { name: 'Screamer', type: 'effect', controller: 12, channel: 1 },
            { name: 'Delay', type: 'effect', controller: 13, channel: 1 },
            { name: 'Sustain Piano', type: 'trigger', controller: 64, channel: 1 },
            {
                name: 'Clean Amp',
                type: 'program',
                controller: 15,
                messages: [
                    { channel: 1, controller: 19, value: 127, type: MidiMessageType.ControlChange },
                    { channel: 1, controller: 20, value: 0, type: MidiMessageType.ControlChange },
                    { channel: 1, controller: 21, value: 0, type: MidiMessageType.ControlChange }
                ],
                channel: 1
            },
            { name: 'EdgeBreak Amp', type: 'program', controller: 16, channel: 1 },
            { name: 'Cloudy', type: 'program', controller: 17, channel: 1 },
            { name: 'Hi gain', type: 'program', controller: 18, channel: 1 }
        ]
    },
    {
        name: 'Calabruix',
        buttons: [
            {
                name: 'Intro',
                type: 'program',
                controller: 25,
                channel: 1,
                sweeps: [
                    sweeps.Gain,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Preset 2',
                type: 'program',
                controller: 26,
                channel: 1,
                sweeps: [
                    sweeps.Gain,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Activate Pad',
                type: 'effect',
                controller: 27,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 129, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 130, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Activate Voice ',
                type: 'effect',
                controller: 28,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 131, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 132, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Overdrive2',
                type: 'effect',
                controller: 20,
                channel: 1
            },
            { name: 'Delay2', type: 'effect', controller: 21, channel: 1 },
            { name: 'Reverb2', type: 'effect', controller: 22, channel: 1 },
            { name: 'Freeze2', type: 'effect', controller: 23, channel: 1 },
            { name: 'Compressor2', type: 'trigger', controller: 24, channel: 1 }
        ]
    },
    {
        name: 'Fosca',
        buttons: [
            {
                name: 'High reverb',
                type: 'program',
                controller: 31,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Verse',
                type: 'program',
                controller: 32,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Deactivate Pad',
                type: 'trigger',
                controller: 33,
                channel: 1
            },
            {
                name: 'Activate Voice',
                type: 'effect',
                controller: 34,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            { name: 'Sustain Piano', type: 'trigger', controller: 64, channel: 1 },
            { name: 'G', type: 'trigger', controller: 36, channel: 1 },
            { name: 'Bm', type: 'trigger', controller: 37, channel: 1 },
            { name: 'C', type: 'trigger', controller: 38, channel: 1 },
            { name: 'D', type: 'trigger', controller: 39, channel: 1 }
        ]
    },
    {
        name: 'Pèrdua',
        buttons: [
            {
                name: 'Intro',
                type: 'program',
                controller: 41,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Gain',
                type: 'program',
                controller: 42,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Activate Pad',
                type: 'effect',
                controller: 43,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Activate Voice ',
                type: 'effect',
                controller: 44,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Overdrive',
                type: 'effect',
                controller: 45,
                channel: 1
            },
            { name: 'Delay2', type: 'effect', controller: 46, channel: 1 },
            { name: 'Reverb2', type: 'effect', controller: 47, channel: 1 },
            { name: 'Freeze2', type: 'effect', controller: 48, channel: 1 },
            { name: 'Compressor2', type: 'effect', controller: 49, channel: 1 }
        ]
    },
    {
        name: 'Ho has gravat',
        buttons: [
            {
                name: 'Preset 1',
                type: 'program',
                controller: 51,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Preset 2',
                type: 'program',
                controller: 52,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Activate Pad',
                type: 'effect',
                controller: 53,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Activate Voice ',
                type: 'effect',
                controller: 54,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Overdrive',
                type: 'effect',
                controller: 55,
                channel: 1
            },
            { name: 'Delay2', type: 'effect', controller: 56, channel: 1 },
            { name: 'Reverb2', type: 'effect', controller: 57, channel: 1 },
            { name: 'Freeze2', type: 'effect', controller: 58, channel: 1 },
            { name: 'Compressor2', type: 'effect', controller: 59, channel: 1 }
        ]
    },
    {
        name: 'Mariner',
        buttons: [
            {
                name: 'Preset 1',
                type: 'program',
                controller: 61,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Preset 2',
                type: 'program',
                controller: 62,
                channel: 1,
                sweeps: [
                    sweeps.Reverb,
                    sweeps.Delay
                ]
            },
            {
                name: 'Activate Pad',
                type: 'effect',
                controller: 63,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Activate Voice ',
                type: 'effect',
                controller: 64,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Overdrive',
                type: 'effect',
                controller: 65,
                channel: 1
            },
            { name: 'Delay2', type: 'effect', controller: 66, channel: 1 },
            { name: 'Reverb2', type: 'effect', controller: 67, channel: 1 },
            { name: 'Freeze2', type: 'effect', controller: 68, channel: 1 },
            { name: 'Compressor2', type: 'effect', controller: 69, channel: 1 }
        ]
    },
    {
        name: 'Sinte volador',
        buttons: [
            { name: 'Cm', type: 'trigger', controller: 71, channel: 1 },
            { name: 'Ab/Cm', type: 'trigger', controller: 72, channel: 1 },
            { name: 'Bb', type: 'trigger', controller: 73, channel: 1 },
            { name: 'Eb', type: 'trigger', controller: 74, channel: 1 },
            { name: 'Eb', type: 'trigger', controller: 75, channel: 1 },
            {
                name: 'Preset 1',
                type: 'program',
                controller: 76,
                channel: 1,
                sweeps: [
                    sweeps.Gain,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Preset 2',
                type: 'program',
                controller: 77,
                channel: 1,
                sweeps: [
                    sweeps.Gain,
                    sweeps.SynthGainFilter
                ]
            },
            {
                name: 'Deactivate Pad',
                type: 'effect',
                controller: 70,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 79, value: 127, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 80, value: 127, type: MidiMessageType.ControlChange }
                ]
            },
            {
                name: 'Void',
                type: 'effect',
                controller: 64,
                channel: 1,
                onMessages: [
                    { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
                ],
                offMessages: [
                    { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
                ]
            }
        ]
    }
]

export default async function (sql: Sql) {
    for (const sweep of Object.values(sweeps)) {
        const [sweepRecord] = await sql`
            INSERT INTO sweep (name, controller, channel, min, max, curve, pedal)
            VALUES (${sweep.name}, ${sweep.controller ?? null}, ${sweep.channel}, ${sweep.min},
                    ${sweep.max}, ${sweep.curve}, ${sweep.pedal})
            RETURNING id
        `;
        sweep.id = sweepRecord.id
    }
    for (const bankData of banksData) {
        // Upsert bank
        const [bank] = await sql`
            INSERT INTO bank (name)
            VALUES (${bankData.name})
            RETURNING id
        `;

        const bankId = bank.id;

        // Upsert buttons and related data
        for (const buttonData of bankData.buttons) {
            let controller
            if ('controller' in buttonData) {
                controller = buttonData.controller
            }
            let channel
            if ('channel' in buttonData) {
                channel = buttonData.channel
            }
            const [button] = await sql`
                INSERT INTO button (name, type, controller, channel, bank_id)
                VALUES (${buttonData.name}, ${buttonData.type}, ${controller}, ${channel},
                        ${bankId})
                ON CONFLICT (name, bank_id) DO UPDATE SET type       = EXCLUDED.type,
                                                          controller = EXCLUDED.controller,
                                                          channel    = EXCLUDED.channel
                RETURNING id
            `;

            const buttonId = button.id;

            // Insert or update sweeps associated with the button
            if (buttonData.sweeps) {
                for (const sweep of buttonData.sweeps) {
                    await sql`
                        insert into button_sweep (button_id, sweep_id)
                        values (${buttonId}, ${sweep.id})
                        on conflict do nothing
                    `;
                }
            }

            // Upsert onMessages associated with the button
            if ('onMessages' in buttonData) {
                for (const message of buttonData.onMessages) {
                    await sql`
                        DELETE FROM button_on_message
                        WHERE button_id = ${buttonId}
                        `
                    let value: number | null = null
                    if ('value' in message) {
                        value = message.value
                    }
                    const [messageRecord] = await sql`
                        INSERT INTO midi_message (channel, controller, type, value)
                        VALUES (${message.channel}, ${message.controller}, ${message.type}, ${value})
                        RETURNING id
                    `;

                    await sql`
                        INSERT INTO button_on_message (button_id, message_id)
                        VALUES (${buttonId}, ${messageRecord.id})
                    `;
                }
            }

            // Upsert offMessages associated with the button
            if ('offMessages' in buttonData) {
                for (const message of buttonData.offMessages) {
                    let value
                    if ('value' in message) {
                        value = message.value
                    }
                    const [messageRecord] = await sql`
                        INSERT INTO midi_message (channel, controller, type, value)
                        VALUES (${message.channel}, ${message.controller}, ${message.type}, ${value})
                        RETURNING id
                    `;

                    await sql`
                        INSERT INTO button_off_message (button_id, message_id)
                        VALUES (${buttonId}, ${messageRecord.id})
                    `;
                }
            }

            // Upsert messages associated with the button
            if ('messages' in buttonData) {
                for (const message of buttonData.messages) {
                    await sql`
                        DELETE FROM button_message
                        WHERE button_id = ${buttonId}
                        `
                    let value: number | null = null
                    if ('value' in message) {
                        value = message.value
                    }
                    const [messageRecord] = await sql`
                        INSERT INTO midi_message (channel, controller, type, value)
                        VALUES (${message.channel}, ${message.controller}, ${message.type}, ${value})
                        RETURNING id
                    `;

                    await sql`
                        INSERT INTO button_message (button_id, message_id)
                        VALUES (${buttonId}, ${messageRecord.id})
                    `;
                }
            }
        }

    }
}
