import Enmap from 'enmap';
import express, { json, Request, Response } from 'express';
import { getSegment, SegmentI, setSegment } from './classes/segment.js';

export const kvdb = new Enmap({ name: 'segmentatime_kv' });
export const segmentsdb = new Enmap({ name: 'segmentatime_segments', fetchAll: false });
const app = express();

const port = 1484;

kvdb.ensure('points', 0);
kvdb.ensure('currentSegment', 0);

app.use(express.static('public'));
app.use(express.static('dist/web'));

app.use(json());

app.get('/api/segment/:id', (req: Request, res: Response) => {
    res.json(getSegment(req.params.id.toString()));
});

app.patch('/api/segment/:id', (req: Request, res: Response) => {
    res.json(setSegment(req.body as SegmentI));
});

app.listen(port, () => {
    console.log('Listening!');
});
