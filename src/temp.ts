import S3Service from "./services/S3Service"

async function fnc() {
  const a = await S3Service.generateGetPresignedUrl('c355966/Restaurants/12d5edbd-029f-44d3-a02c-a53a1e2d6b7e/items/b08c506c-c5ab-4fad-8064-28d72c87d168/Besties.jpg');
  console.log(a);
  
}

fnc()