//TODO: provide parameter for semester
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cliProgress = require('cli-progress');
const jsonfile = require('jsonfile');
const fs = require('fs');
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
async function main(year, season) {
  let a = year + season;
  let arr = [];
  const res = await fetch("https://youranimes.tw/premiered/" + a).catch(err => {
    console.log(err);
  });
  const dom = new JSDOM(await res.text());
  const ch_title = dom.window.document.querySelectorAll("div.w-full > h2");
  for (let i = 0; i < ch_title.length; i++) {
    const jp_title = ch_title[i].nextElementSibling;
    const info = jp_title.nextElementSibling;
    const poster = info.querySelector("div > picture > img");
    const company = info.querySelector("div > dl > div > dd");
    const date = info.querySelector("div > dl > div:nth-child(2) > dd");
    if (info.querySelector("div > dl > div:nth-child(3) > dt")?.textContent == "集數") {
      var episode = info.querySelector("div > dl > div:nth-child(3) > dd");
    } else {
      var episode = info.querySelector("div > dl > div:nth-child(4) > dd");
    }
    try {
      arr.push({
        "ch_title": ch_title[i].textContent,
        "jp_title": jp_title?.textContent,
        "poster": poster?.src,
        "company": company?.textContent,
        "date": date?.textContent,
        "episode": episode?.textContent.slice(0, -1)
      });
    } catch (err) {
      console.log(err);
    }
  }
  jsonfile.writeFileSync(`./data/${a}.json`, arr);
}

for (let i = 2008; i <= 2023; i++) {
  for (let j = 0; j <= 3; j++) {

    let season = [
      'winter',
      'spring',
      'summer',
      'autumn'
    ]

    main(i, season[j]);

  }
}
