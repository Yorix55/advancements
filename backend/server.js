import 'dotenv/config';
import express from 'express';
import SftpClient from 'ssh2-sftp-client';
import { posix } from 'node:path';
import { fetchUuid } from './get_uuid.js';

const app = express();

app.get('/api/files', async (_req, res) => {
    const sftp = new SftpClient();

    try {
        await sftp.connect({
            host: process.env.SFTP_HOST,
            port: Number(process.env.SFTP_PORT),
            username: process.env.SFTP_USER,
            password: process.env.SFTP_PASSWORD,
        });

        const files = await sftp.list(process.env.SFTP_DIRECTORY);
        res.json(files);
    } catch (error) {
        console.error('Could not retrieve SFTP files:', error);
        res.status(502).json({ error: 'Could not retrieve files' });
    } finally {
        await sftp.end().catch(() => { });
    }
});


app.get('/api/files/:name', async (req, res) => {
    const uuid = await fetchUuid(req.params.name);
    if (!uuid) {
        return res.status(404).json({ error: 'Player not found' });
    }
    const fileName = `${uuid}.json`;

    // Keep requests confined to the configured remote directory.
    if (fileName !== posix.basename(fileName) || fileName === '.' || fileName === '..') {
        return res.status(400).json({ error: 'Invalid file name' });
    }

    const sftp = new SftpClient();

    try {
        await sftp.connect({
            host: process.env.SFTP_HOST,
            port: Number(process.env.SFTP_PORT),
            username: process.env.SFTP_USER,
            password: process.env.SFTP_PASSWORD,
        });

        const remotePath = posix.join(process.env.SFTP_DIRECTORY, fileName);
        const content = await sftp.get(remotePath);
        res.type('text/plain').send(content.toString('utf8'));
    } catch (error) {
        console.error('Could not retrieve file:', error);
        res.status(502).json({ error: 'Could not retrieve file' });
    } finally {
        await sftp.end().catch(() => { });
    }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});

