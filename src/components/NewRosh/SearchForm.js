// import { useState } from 'react';


// const SearchForm = () => {

//     const [subs, setSubs] = useState();

//     const fetchMeals = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/substitutes?ingredientName=butter", {
//                 "method": "GET",
//                 "headers": {
//                     "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//                     "x-rapidapi-key": "32b559bd07msh11ee803b4e06284p16e173jsn54d7a9b35461"
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Something went wrong!');
//             }
//             const responseData = await response.json();

//             const loadedSubs = [];
//             for (const key in responseData) {
//                 loadedSubs.push({
//                     id: key,
//                     substitutes: responseData[key].substitutes,
//                     message: responseData[key].message,
//                 });
//             }
//             setSubs(loadedSubs);

//         } catch (error) {
//             console.log(error);
//         }

//     };


//     return (
//         <>
//             <form>
//                 <div>
//                     <div>
//                         <label>Enter food you ate </label>
//                         <input></input>
//                     </div>
//                     <div>
//                         <button onClick={fetchMeals}>Search</button>
//                     </div>
//                 </div>
//             </form>

//             <div>
//                 <p>{subs}</p>
//             </div>
//         </>
//     )
// };

// export default SearchForm;