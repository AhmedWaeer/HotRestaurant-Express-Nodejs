const store = require('../db/store');

module.exports = (app) => {


    app.get('/api/tables', (req, res) =>
        store.getReservations().then((reservations) =>
            reservations.filter((reservation) => reservation.status === 'current')
        ).then((tables) =>
            res.json(tables)
        ).catch((err) => res.status(500).json(err)));

    app.get('/api/waitlist', (req, res) => store.getReservations().then((reservations) =>
        reservations.filter((reservation) => reservation.status === 'waitlist')
    ).then((waitlist) => res.json(waitlist)));

    app.post('/api/tables', (req, res) => {
        let newReservation = req.body;
        store.addReservation(newReservation).then((reservation) => {

            if (reservation.status === 'current') {
                return res.json(true);
            } else {

                return res.json(false);

            }
        });

    });

    app.delete('/api/clear', (req, res) => {
        store.removeNote().then(() => res.json({ ok: true }))
            .catch((err) => res.status(500).json(err));



    });
}