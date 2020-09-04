//this will check a valid location i.e blank/only characters
function validateLocation(location) {
    console.log("::: Running validateLocation :::", location);
    var res = location.match(/^[A-Za-z]+$/);
    if(res == null)
        return false;
    else
        return true;
}

export { validateLocation }
