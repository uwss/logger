const fs = require("fs");

const format = require("format-parser");

class FieldLogger {
  #stream;
  #timefmt;
  #fmtstring;

  constructor(path, timefmt, fmtstring) {
    this.#stream = fs.createWriteStream(path, {
      flags: "a",
      mode: 0o644
    });
    
    this.#timefmt = timefmt;
    this.#fmtstring = fmtstring;
  }
  
  /**
   * FORMAT:
   *   %t   -  Time using timefmt string
   */
  log(opt) {
    let time = format.timestamp(new Date(), this.#timefmt);
    
    let data = format(this.#fmtstring, function(data) {
      if(data.flag === "t") {
        if(data.options === "") {
          return time;
        }
      } else if(opt[data.flag]) {
        if(opt[data.flag][data.options]) {
          return opt[data.flag][data.options];
        }
      }

      throw new format.UnrecognizedError(data);
    });

    this.#stream.write(data + "\n");
  }

  close() {
    this.#stream.close();
  }
}

class TextLogger {
  #stream;
  #timefmt;
  #fmtstring;

  constructor(path, timefmt, fmtstring) {
    this.#stream = fs.createWriteStream(path, {
      flags: "a",
      mode: 0o644
    });
    
    this.#timefmt = timefmt;
    this.#fmtstring = fmtstring;
  }
  
  /**
   * FORMAT:
   *   %t   -  Time using timefmt string
   */
  log(message, opt) {
    let time = format.timestamp(new Date(), this.#timefmt);
    
    let data = format(this.#fmtstring, function(data) {
      if(data.flag === "t") {
        if(data.options === "") {
          return time;
        }
      } else if(opt[data.flag]) {
        if(opt[data.flag][data.options]) {
          return opt[data.flag][data.options];
        }
      }

      throw new format.UnrecognizedError(data);
    });
    
    let split = message.split("\n");
    
    this.#stream.write(data + " " + split[0] + "\n");

    for(let i = 1; i < split.length; ++i) {
      this.#stream.write(".".repeat(data.length) + " " + split[i] + "\n");
    }
  }

  close() {
    this.#stream.close();
  }
}

module.exports = { FieldLogger, TextLogger };

