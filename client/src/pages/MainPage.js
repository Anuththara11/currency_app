import React,{useEffect,useState} from 'react';
import axios from "axios";
export default function MainPage() {
     //states for the feild
     const[date,setDate]=useState(null);
     const[sourceCurrency,setSourceCurrency]=useState("");
     const[targetCurrency,setTargetCurrency]=useState("");
     const[amountInSourceCurrency,setAmountInSourceCurrency]=useState(0);
     const[amountInTargetCurrency,setAmountInTargetCurrency]=useState(0);
     const[currncyNames,setCurrencyNames]=useState([])
    

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
            const responce=await axios.get("http://localhost:5000/convert",{
                params:{
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency,
                },
            });
            setAmountInTargetCurrency(responce.data);
        }catch(err){
            console.error(err);
        };

            
        
    };
       // get all currencyNames
      
       useEffect(() => {
           const getCurrencyNames = async () => {
               try {
                   const responce = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                   );
                   setCurrencyNames(responce.data);
               } catch (err) {
                   console.error(err);
               }
           };
         getCurrencyNames();
       }, [])
       

    return ( 
       
    <div>
        <h1 className= "lg:mx-32 text-5xl font-bold text-green-500">Convert Your Currencies Today</h1>
        <p className="lg:mx-32 opacity-40 py-6">Welcome to "Convert Your Courrencies Today"! This application allows you
            to easily convert currencies based on the  latest exchange rates.whether 
            you 're planning a trip, managing your finances,or simply curios about 
            the value of your money in diffrent currencies,this tool is here to
            help.
        </p>
       
        <div className='mt-5 flex items-center justify-center flex-col'>
              <section className="w-full lg:w-1/2">
                    <form onSubmit={handleSubmit}>
                     
                        <div className="mb-4">
                            <label htmlFor={date} className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Date
                            </label>
                            <input 
                            onChange={(e)=>setDate(e.target.value)}
                            type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Source Currency
                            </label>
                            <select
                                onChange={(e)=>setSourceCurrency(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            name={sourceCurrency}
                            id={sourceCurrency}
                            value={sourceCurrency}
                            >
                                <option value="">Select source Currency</option>
                                {Object.keys(currncyNames).map((currency) =>(
                                    <option className="p-1" key={currency} value={currency}>
                                        {currncyNames[currency]}
                                    </option>
                                   
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor={targetCurrency} 
                            className="block mb-2 text-sm font-medium text-white-900 dark:text-white">
                                Target Currency
                            </label>
                            <select 
                                onChange={(e)=>setTargetCurrency(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            name={targetCurrency}
                            id={targetCurrency}
                            value={targetCurrency}

                            >
                                <option value="">Select target Currency</option>
                                {Object.keys(currncyNames).map((currency) =>(
                                    <option className="p-1" key={currency} value={currency}>
                                        {currncyNames[currency]}
                                    </option>  
                                   
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Amount in Source Currency
                            </label>
                            <input 
                                onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                                type="number" 
                                id={amountInSourceCurrency} 
                                name={amountInSourceCurrency} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in Source Currency" required
                            />
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">  
                     
                        Get the target Currency
                        </button>

                    </form>
                </section>
        </div>
        <section className="lg:mx-72 mt-5">
            {amountInSourceCurrency} {currncyNames[sourceCurrency]} is equal to {" "}
           <span className="text-green-500 font-bold">{amountInTargetCurrency}</span>  in {currncyNames[targetCurrency]}
        </section>
        
    </div>
    );

}
