export function checkDay(dateTime) {
    const date = new Date(dateTime);
    const day = date.getDay();
    if (day === 1) {
        return 'monday';
    }
    else if (day === 2) {
        return 'tuesday';
    }
    else if (day === 3) {
        return 'wednesday';
    }
    else if (day === 4) {
        return 'thursday';
    }
    else if (day === 5) {
        return 'friday';
    }
    else {
        return 'error';
    }
}
