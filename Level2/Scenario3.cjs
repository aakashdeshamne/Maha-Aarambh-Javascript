// 3. Advanced Data Validation

// Scenario: You are creating a user registration endpoint. 
// The user data must be strictly validated before being saved.
// Task: Write a function validateUserData(userData) 
// that takes a user object (e.g., { username, email, password }). 
// It should return an object with two properties: isValid (boolean) and errors (an array of error messages). 
// The function must validate the following rules:

// username must be a string between 3 and 20 characters, alphanumeric only.

// email must be a valid email format.

// password must be at least 8 characters long and contain at least one number and one letter.

const validateUserData=(userData)=>{
    const { username, email, password } = userData;
    const error=[];
    const userNameRegex=/^[a-zA-Z0-9]{3,20}$/;
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!username|| typeof(username)!=='string'||!userNameRegex.test(username)){
        error.push("Username is not valid. It must have 3 to 20 alphanumeric characters.");
    }
    if(!email|| typeof(email)!=='string'||!emailRegex.test(email)){
        error.push("Email is not valid.");
    }
    if(!password|| typeof(password)!=='string'||!passwordRegex.test(password)){
        error.push("Password is not valid.");
    }
    return error.length>0?{isValid:false,errors:error}:{isValid:true,errors:[]};
}

//Example usages
console.log(validateUserData({username:"user1",email:"deshmane100@gmail.com",password:"password1"}));