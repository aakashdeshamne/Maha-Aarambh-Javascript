// 9. Third-Party API Integration with Error Handling

// Scenario: You need to display the current weather for a given city by fetching data from an
//  external weather API. This external API can be slow or fail.
// Task: Write an async function getWeather(city) that fetches data from a public weather API 
// (e.g., OpenWeatherMap). The function must include:

// A timeout of 5 seconds for the request. If the API doesn't respond in time, 
// the request should be aborted and an error thrown.

// Proper error handling for non-200 status codes from the external API.

// Logic to parse the JSON response and return a simplified weather object (e.g., { temp, description }).

const express=require('express');
const app=express();

const weatherurl="http://api.openweathermap.org/data/2.5/weather";
const apiKey=process.env.WEATHER_API_KEY;

const getWeather=async(city)=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>{
        controller.abort();
    } ,5000);
    try{
        const response=await fetch(`${weatherurl}?q=${city}&appid=${apiKey}&units=metric`,{signal:controller.signal});
        clearTimeout(timeout);
        if(!response.ok){
            throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
        }
        const data=await response.json();
        return {
            temp:data.main.temp,
            description:data.weather[0].description
        };
    }
    catch(err){
        if(err.name==='AbortError'){
            throw new Error('Request timed out');
        }
        throw err;
    }
}