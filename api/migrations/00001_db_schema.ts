import { Sql } from 'postgres';

export default async function (sql: Sql) {

    // Create the bank table
    await sql`
        CREATE TABLE bank
        (
            id   SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `;

    // Create the button table
    await sql`
        CREATE TABLE button
        (
            id         SERIAL PRIMARY KEY,
            name       VARCHAR(255) NOT NULL,
            position      INTEGER      NOT NULL,
            enabled    BOOLEAN DEFAULT TRUE,
            type VARCHAR(50) NOT NULL CHECK (type IN ('effect', 'trigger', 'program', 'returnToPreviousBank', 'goToDirectBank')),

            controller INTEGER,
            channel    INTEGER,
            bank_id    INTEGER REFERENCES bank (id) ON DELETE CASCADE,
            UNIQUE (name, bank_id)
        )
    `;

    // Create the midi_message_type enum
    await sql`
        CREATE TYPE midi_message_type AS ENUM (
            'control-change',
            'program-change',
            'note-on',
            'note-off'
            )
    `;

    // Create the midi_message table
    await sql`
        CREATE TABLE midi_message
        (
            id         SERIAL PRIMARY KEY,
            channel    INTEGER           NOT NULL,
            controller INTEGER           NOT NULL,
            type       midi_message_type NOT NULL,
            value      INTEGER
        )
    `;

    // Create the button_on_message table
    await sql`
        CREATE TABLE button_on_message
        (
            button_id  INTEGER NOT NULL REFERENCES button (id) ON DELETE CASCADE,
            message_id INTEGER NOT NULL REFERENCES midi_message (id) ON DELETE CASCADE,
            PRIMARY KEY (button_id, message_id)
        )
    `;

    // Create the button_off_message table
    await sql`
        CREATE TABLE button_off_message
        (
            button_id  INTEGER NOT NULL REFERENCES button (id) ON DELETE CASCADE,
            message_id INTEGER NOT NULL REFERENCES midi_message (id) ON DELETE CASCADE,
            PRIMARY KEY (button_id, message_id)
        )
    `;

    // Create the button_message table
    await sql`
        CREATE TABLE button_message
        (
            button_id  INTEGER NOT NULL REFERENCES button (id) ON DELETE CASCADE,
            message_id INTEGER NOT NULL REFERENCES midi_message (id) ON DELETE CASCADE,
            PRIMARY KEY (button_id, message_id)
        )
    `;

    // Create the sweep table
    await sql`
        CREATE TABLE sweep
        (
            id         SERIAL PRIMARY KEY,
            name       VARCHAR(255) NOT NULL UNIQUE,
            controller INTEGER      NOT NULL,
            channel    INTEGER      NOT NULL,
            min        INTEGER      NOT NULL,
            max        INTEGER      NOT NULL,
            curve      VARCHAR(50)  NOT NULL CHECK (curve IN ('linear', 'fast', 'slow')),
            pedal      INTEGER      NOT NULL CHECK (pedal IN (1, 2)),
            value      INTEGER
        )
    `;

    // Create the button_sweep table
    await sql`
        CREATE TABLE button_sweep
        (
            button_id INTEGER NOT NULL REFERENCES button (id) ON DELETE CASCADE,
            sweep_id  INTEGER NOT NULL REFERENCES sweep (id) ON DELETE CASCADE,
            PRIMARY KEY (button_id, sweep_id)
        )
    `;
}
