const keywords = [
  'scifi',
  'zines',
  'doodlecrew',
  'creativesclub',
  'comics',
  'poetry'
]
loadNext(keywords, 0);

function loadJSON(path, index) {
  fetch(path)
    .then(response => response.json())
    .then((json) => {printJSON(json, keywords, index+1)});
}

function printJSON(json, keywords, index) {
  console.log(json)
  loadNext(keywords, index)
}

function loadNext(keywords, index) {
  if (index < keywords.length) {
    let keyword = keywords[index];
    console.log('Loading ' + keyword + '...')
    loadJSON('./' + keyword + '.json', index)
  } else {
    console.log('All JSONs loaded.')
  }
}