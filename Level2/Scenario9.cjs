// 9. Simple Job Queue Processor

// Scenario: Users can request a resource-intensive report to be generated. 
// You don't want to block the server, so you decide to process these requests one by one in the background.
// Task: Create a simple jobQueue object. 
// It should have an addJob(job) method that adds a function (the job) to an array. 
// It should also have a processQueue() method. When processQueue() is called, 
// it should process the first job in the queue. Once that job's promise resolves, 
// it should automatically start processing the next job, and so on, until the queue is empty.

const jobQueue={
    queue:[],
    addjob(job){
        this.queue.push(job);
        if(this.queue.length==1){
            this.processQueue();
        }
    },
    async processQueue(){
        if(this.queue.length==0)return;
        const job=this.queue[0];
        try{
            await job();
            this.queue.shift();
            this.processQueue();
        }
        catch(err){
            console.error('Job failed:',err);
        }
    }
}
