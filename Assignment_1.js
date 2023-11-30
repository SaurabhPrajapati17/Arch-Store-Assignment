const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://catfact.ninja/breeds';


async function logResponseToFile(response,fileName) {
  try {
    await fs.promises.writeFile(fileName, JSON.stringify(response, null, 2));
    console.log(`Response logged to ${fileName}`);
  } catch (error) {
    console.error('Error writing to file:', error.message);
  }
}


async function getDataFromAllPages() {
  try {
    let pageNumber=1;
    let allBreeds = {};
    let allData=[];

    while (true) {
      const response = await axios.get(`${apiUrl}?page=${pageNumber}`);
      
      if (response.data.data.length<=0) {
        break; 
      }

      const breeds = response.data.data;
      allData.push(breeds)

      breeds.forEach(breed => {
        const origin = breed.country;
        if (!allBreeds[origin]) {
          allBreeds[origin] = [];
        }
        allBreeds[origin].push({
          breed: breed.breed,
          origin: breed.origin,
          coat: breed.coat,
          pattern: breed.pattern,
        });
      });

      pageNumber++;
    }

    return {pageNumber,allData,allBreeds};
} 
  catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}


// Main function to perform the tasks
async function main() {
  try {
    
    let {pageNumber,allData,allBreeds}=await getDataFromAllPages();

    // Task 2: Console log the number of pages of data
    console.log('Total Page Number',pageNumber);
    await logResponseToFile(pageNumber,'pageNumber.txt');
    
    //Task 3 : All data
    console.log('All data:',allData);
    await logResponseToFile(allData,'allData.txt');

    // Task 4a: Return cat breeds grouped by Country in the desired format
    console.log('All breed data:',allBreeds);
    await logResponseToFile(allBreeds,'allBread.txt');

  } catch (error) {
    console.error(error.message);
  }
}

// Run the main function
main();