const fs = require('fs');
const jsonfile = require('jsonfile');
for (let i = 2008; i <= 2023; i++) {
  for (let j = 0; j <= 3; j++) {

    let season = [
      'winter',
      'spring',
      'summer',
      'autumn'
    ]
    if(fs.existsSync('./data/' + i + season[j] + '.json')){
      //get length
      let data = jsonfile.readFileSync('./data/' + i + season[j] + '.json');
      console.log(data.length);
    }

  }
  console.log("----");
}