class Reservation {
    constructor(id, limit) {
        this.id = id;
        this.limit = limit;
    }

    createReservation() {
        if (this.limit > 0) {
            this.limit--;
            console.log("Reservation created. Remaining limit:", this.limit);
        } else {
            console.log("No more reservations can be made.");
        }
    }

    editReservation(newLimit) {
        this.limit = newLimit;
        console.log("Reservation edited. New limit:", this.limit);
    }

    deleteReservation() {
        console.log("Reservation deleted.");
    }
}
