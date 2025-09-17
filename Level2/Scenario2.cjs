// 2. Parallel Asynchronous Fetching
// Scenario: A user's dashboard needs to display data from three different, 
// independent API endpoints simultaneously: user profile, recent orders, and notifications.
// Task: Write an async function getDashboardData(userId) that takes a userId. 
// Inside the function, use Promise.all() to fetch data from these three API endpoints in parallel:

// https://api.example.com/users/${userId}

// https://api.example.com/orders/by-user/${userId}

// https://api.example.com/notifications/${userId}

// The function should return a single object containing profile, orders, and notifications.

const profileurl='https://api.example.com/users/';
const ordersurl='https://api.example.com/orders/by-user/';
const notificationsurl='https://api.example.com/notifications/';

const getDashboardData=async(userId)=>{
    try{
        const [profileresponce,orderresponce,notificationresponce]=await Promise.all([
            fetch(`${profileurl}${userId}`),
            fetch(`${ordersurl}${userId}`),
            fetch(`${notificationsurl}${userId}`)
        ])
        if(!profileresponce.ok){
            throw new Error("Failed to fetch profile data");
        }
        if(!orderresponce.ok){
            throw new Error("Failed to fetch order data");
        }
        if(!notificationresponce.ok){
            throw new Error("Failed to fetch notification data");
        }
        const [profile, orders, notifications] = await Promise.all([
            profileresponce.json(),
            orderresponce.json(),
            notificationresponce.json()
        ]);
        return {profile,orders,notifications};
    }
    catch(error){
        console.error("Error fetching dashboard data:",error);
        throw error;
    }
}
getDashboardData(123).then(data=>{
    console.log(data);
}).catch(err=>{
    console.error(err);
});

//Much cleaner and faster way
const getDashboardData2=async(userId)=>{
    try{
        const responce=await Promise.all([
            fetch(`${profileurl}${userId}`),
            fetch(`${ordersurl}${userId}`),
            fetch(`${notificationsurl}${userId}`)
        ])
        if(!responce.every(res=>res.ok)){
            throw new Error("Failed to fetch all data");
        }
        const [profile,order,notification]=await Promise.all(responce.map(res=>res.json()));
        return {profile,order,notification};
    }
   catch(error){
       console.log("Error while fetching data",error);
       throw error;
   }
}