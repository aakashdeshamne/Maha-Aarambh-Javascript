// 3. Implementing a Circuit Breaker

// Scenario: Your application relies on an external, third-party "shipping-rate" API. 
// This API has become unreliable and sometimes hangs, 
// causing your server's requests to pile up and eventually crash your service.
// Task:

// Write a wrapper function or class for the shipping-rate API call.

// Implement a simple "Circuit Breaker" pattern around this call without using an external library. 
// The circuit breaker should have three states: CLOSED, OPEN, and HALF-OPEN.

// Logic:

// Closed: Requests pass through normally. If a certain number of failures occur in a row (e.g., 3), 
// the circuit trips to OPEN.

// Open: For a set period (e.g., 30 seconds), all calls to the service fail immediately without even 
// making the network request. After the timeout, the circuit switches to HALF-OPEN.

// Half-Open: Allow a single "trial" request to go through. If it succeeds, the circuit moves to CLOSED.
//  If it fails, it goes back to OPEN.

class CurcitBreaker{
    constructor(requestFunction,falureThreshold=3,openTimeOut=30000){
        this.requestFunction=requestFunction;
        this.falureThreshold=falureThreshold;
        this.openTimeOut=openTimeOut;
        this.state="CLOSED";
        this.failureCount=0;
        this.nextAttempt=Date.now();
    }
    async call(...args){
        if(this.state==="OPEN"){
            if(Date.now()>this.nextAttempt){
                this.state="HALF-OPEN";
                log("Circuit breaker state changed to HALF-OPEN");
            }
            else{
                throw new Error("Circuit breaker is OPEN. Request failed immediately.");
            }
        }
    
        try{
            const response=await this.requestFunction(...args);
            this.success();
            return response;

        }
        catch(error){
            this.failure();
            throw error;
        }
    }
    success(){
            this.failureCount=0;
            if(this.state==="HALF-OPEN"){
                log("Circuit breaker state changed to CLOSED");
            } 
            this.state="CLOSED";  
        }

        failure(){
            this.failureCount++;
            if(this.failureCount>=this.falureThreshold){
                this.state="OPEN";
                this.nextAttempt=Date.now()+this.openTimeOut;
                log("Circuit breaker state changed to OPEN");
            }
            
        }

}
