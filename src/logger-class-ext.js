const logger = require("./logger-class");

class StatusLogger extends logger.TextLogger {
  constructor(path, timefmt, fmtstring) {
    super(path, timefmt, fmtstring);
  }

  do_log(message, extra, level) {
    let txt;
    if(message instanceof Error) {
      txt = message.stack;
    } else {
      txt = message;
    }

    super.log(txt, {
      "l": {  // Log level
        "": level
      },
      ...extra
    });
  }

  emerg(message, extra, level="emerg") {
    this.do_log(message, extra, level);
  }

  alert(message, extra, level="alert") {
    this.do_log(message, extra, level);
  }

  crit(message, extra, level="crit") {
    this.do_log(message, extra, level);
  }

  error(message, extra, level="error") {
    this.do_log(message, extra, level);
  }

  warn(message, extra, level="warn") {
    this.do_log(message, extra, level);
  }

  notice(message, extra, level="notice") {
    this.do_log(message, extra, level);
  }

  info(message, extra, level="info") {
    this.do_log(message, extra, level);
  }

  debug(message, extra, level="debug") {
    this.do_log(message, extra, level);
  }

  trace(message, extra, level="trace") {
    this.do_log(message, extra, level);
  }
}

module.exports = { StatusLogger };

