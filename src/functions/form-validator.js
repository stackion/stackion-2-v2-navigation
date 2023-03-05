export const checkIfDataListIsEmpty = data => {
    if(data.every(e => e.trim() != "")) {
        return true;
    }
    else {
        return false;
    }
}