import { validateLocation } from '../src/client/js/validatelocation'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests
describe('Test to validate location input', () =>{
    test('Test to check with a invalid location', () =>{
        const inputStatus = validateLocation("mumbai123");
        expect(inputStatus).toBeFalsy();
    })    
    test('Test to check with a valid location', () => {
        const inputStatus = validateLocation("mumbai");
        expect(inputStatus).toBeTruthy();
    });
})
