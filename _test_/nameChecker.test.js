import { checkForName } from '../src/client/js/nameChecker'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
test('Test to check whether namechecker function is working as expected for a given name', () => {
    const nameStatus = checkForName("Picard");
    expect(nameStatus).toBeTruthy();
});