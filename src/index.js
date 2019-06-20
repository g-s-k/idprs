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

    let sel = text.slice(0, selLen).trimEnd();
    text = text.slice(selLen + 1).trimStart();

    if (text.length === 0) {
      throw Error(`Identifier \`${sel}\` did not have angle brackets`);
    }

    let relLen = 0;
    for (let c of text) {
      if (c === ">") break;
      relLen++;
    }

    let rel = text.slice(0, relLen).trimEnd();

    if (relLen === text.length) {
      throw Error(
        `Identifier \`${sel}<${rel}\` did not have a closing angle bracket`
      );
    }

    text = trimDelim(text.slice(relLen + 1));

    yield `${sel}<${rel}>`;
  }
}

module.exports = { getIdents };

if (typeof require !== "undefined" && require.main === module) {
  var fs = require("fs");
  var ids = fs.readFileSync(0, "utf-8");

  try {
    for (let ident of getIdents(ids)) {
      console.log(ident);
    }
  } catch (e) {
    console.error("Error encountered while parsing.");
    console.error(e);
    process.exit(1);
  }
}
