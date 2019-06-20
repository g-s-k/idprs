function trimDelim(str) {
  str = str.trimStart();

  while (str.startsWith(",") || str.startsWith(";")) {
    str = str.slice(1).trimStart();
  }

  return str;
}

function* getIdents(text) {
  text = trimDelim(text);

  while (text.length !== 0) {
    let selLen = 0;
    for (let c of text) {
      if (c === "<") break;
      selLen++;
    }

    let relLen = 0;
    for (let c of text.slice(selLen + 1)) {
      if (c === ">") break;
      relLen++;
    }

    let sel = text.slice(0, selLen).trim(),
      rel = text.slice(selLen + 1, selLen + 1 + relLen).trim();

    yield `${sel}<${rel}>`;

    text = trimDelim(text.slice(selLen + relLen + 2));
  }
}

module.exports = { getIdents };

if (typeof require !== "undefined" && require.main === module) {
  var fs = require("fs");
  var ids = fs.readFileSync(0, "utf-8");

  for (let token of getIdents(ids)) {
    console.log(token);
  }
}
