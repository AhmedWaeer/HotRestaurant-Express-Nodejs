const fs = require('fs');
const util = require('util');
var uuid = require('uuid');
const { v1: uuidv1 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {

    read() {
        return readFileAsync('db/tables.json', 'utf8');
    }

    write(reservation) {

        return writeFileAsync('db/tables.json', JSON.stringify(reservation));

    }


    getReservations() {
        return this.read().then((tables) => {
            let parsedTables;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedTables = [].concat(JSON.parse(tables));
            } catch (err) {
                parsedTables = [];
            }

            return parsedTables;
        });
    }

    addReservation(reservation) {
        const { name, email, phone } = reservation;
        const newReservation = { name, phone, id: uuidv1(), email, status: '' };
        return this.getReservations()
            .then((reservations) => {
                if (reservations.length < 5) {
                    newReservation.status = 'current';
                } else {
                    newReservation.status = 'waitlist';
                }
                return [...reservations, newReservation]
            })
            .then((updateddata) => this.write(updateddata))
            .then(() => newReservation);
    }

    removeNote() {
        // Get all notes, remove the note with the given id, write the filtered notes
        return this.getReservations()
            .then((reservations) => {
                reservations = [];
                this.write(reservations)
            });
    }
}

module.exports = new Store();