// 4. Database Transactions

// Scenario: You're building a banking application. When a user transfers money from one account to another,
//  two separate database updates must occur: debiting one account and crediting another. 
//  This entire operation must be atomic—if one part fails, the whole transaction should be rolled back.

// Task: Write a function transferMoney(fromAccountId, toAccountId, amount) 
// using a library like Mongoose (with replica sets enabled for transactions). This function should:

// 1)Start a database session and transaction.

// 2)Find and decrease the balance of the fromAccountId.

// 3)Find and increase the balance of the toAccountId.

// 4)Commit the transaction.

// 4)If any step fails (e.g., insufficient funds), 
// it must abort the transaction so that no changes are saved.

const mongoose=require("mongoose");
const url='mongodb://0.0.1:27017/bankDB';

const connection=async(url)=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Failed to connect to MongoDB"+error.message);
    }
}
connection(url);

const accountSchema=new mongoose.Schema({
    accountId:{
        type:Number,
        require:true,
        unique:true
    },
    balance:{
        type:Number,
        require:true,
        min:[0,'Balance cannot be negative']
    }
})
const accountModel=mongoose.model('Account',accountSchema);

const transaferMoney=async(senderAccountId,recieverAccountId,amount)=>{
    const session=await mongoose.startSession();
    session.startSession();
    try{
        const senderAccount=await accountModel.findOne({accountId:senderAccountId}).session(session);
        if(!senderAccount){
            throw new Error("Sender account not found");
        }
        if(senderAccount.balance<amount){
            throw new Error("Insufficient funds in sender account");
        }
        senderAccount.balance-=amount;
        await senderAccount.save();

        const recieverAccount=await accountModel.findOne({accountId:recieverAccountId}).session(session);
        if(!recieverAccount){
            throw new Error("Reciever account not found");
        }
        recieverAccount.balance+=amount;
        await recieverAccount.save();
        await session.commitTransaction();
        console.log("Transaction successful");
    }
    catch(error){
        await session.abortTransaction();
        console.log("transaction failed: "+error.message);
    }
}

transaferMoney(1,2,50);


