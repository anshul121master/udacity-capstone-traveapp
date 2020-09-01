import { validateInput } from '../src/client/js/inputValidate'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
test('Test to check whether user entered a valid url format', () => {
    const inputStatus = validateInput("https://google.com");
    expect(inputStatus).toBeTruthy();
});