export const addDays = (date: any, daysToAdd: any) => {
    const clone = new Date(date.getTime())
    clone.setDate(clone.getDate()+daysToAdd)
    console.log(clone);
    return clone
};

export const getWeek=(forDate:any, daysOffset = 0)=> {
    const date = addDays(forDate, daysOffset); 
    const day = date.getDay(); 
    return {
    date,
    start: addDays(date, -day), 
    end: addDays(date, 6 - day) 
    };
   }


 export const getData=(url:any)=>  {
     return fetch(url).then(res=> {
         if(!res.ok){
             throw Error("There was a problem fetching data.")
         }

         return res.json()
     })
 }