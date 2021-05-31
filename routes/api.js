const tables = require('../data/tables');
const waitlist = require('../data/waitList');

module.exports = (app) => {


    app.get('/api/tables', (req, res) => res.json(tables));
    app.get('/api/waitlist', (req, res) => res.json(waitlist));
    app.post('/api/tables', (req, res) => {

        console.log(req.body)
        if (tables.length < 5) {
            tables.push(req.body);
            res.json(true);

        } else {
            waitlist.push(req.body);
            res.json(false);

        }

    });

    app.delete('/api/clear', (req, res) => {

        tables.length = 0;
        waitlist.length = 0;
        res.json({ ok: true });
    });

}