const fs = require('fs');
const path = require('path');

class Logger {
  static passedPrefix = '✓  ';
  static failedPrefix = '✘  ';
  static warningPrefix = '⚠  ';
  static timePrefix = '⧖  ';
  static seenPages = new Set();
  static logFilePath;

  static initializeLogger(testName, workerId, specFile) {
    // Extract file name from full path
    const specFileName = path.basename(specFile).replace(/\.[jt]s$/, '');

    // Sanitize test name for file name
    const sanitizedTestName = testName.replace(/[^\w\d-_]/g, '_');

    // Create logs directory per spec
    const logDir = path.resolve(__dirname, `../logs/${specFileName}`);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    this.logFilePath = path.join(logDir, `log-${workerId}-${sanitizedTestName}.txt`);
  }

  static log(message) {
    console.log(message);
    fs.appendFileSync(this.logFilePath, message + '\n');
  }

  static newPage(name) {
    this.log(`―――――――――― ${name} ――――――――――\n`);
  }

  static testStart(name) {
    this.seenPages.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log(` ◈ Test: ${name}`);
    this.log('════════════════════════════════════════════════════════════\n');
  }

  static onPage(pageName) {
    if (this.seenPages.has(pageName)) return;
    this.seenPages.add(pageName);
    this.log(`\n◈ On: ${pageName}`);
  }

  static onForm(formName) {
    if (this.seenPages.has(formName)) return;
    this.seenPages.add(formName);
    this.log(`\n◈ On: ${formName}`);
  }

  static passed(message) {
    this.log(`${this.passedPrefix}${message}`);
  }

  static failed(message) {
    this.log(`${this.failedPrefix}${message}`);
  }

  static warning(message) {
    this.log(`${this.warningPrefix}${message}`);
  }

  static time(message) {
    this.log(`${this.timePrefix}${message}`);
  }

  static loaded(message) {
    this.passed(`Section ${message} - elements have been loaded.`);
  }

  static processLoaded(message) {
    this.passed(`Process ${message} has been loaded.`);
  }

  static valueChecked(message) {
    this.passed(`Value checked: ${message}`);
  }

  static expandSection(message) {
    this.time(`Find section ${message} and expand.`);
  }

  static waitFillForm(message) {
    this.time(`Fill form - ${message} section.`);
  }

  static formFilled(message) {
    this.passed(`${message} form filled successfully.`);
  }
}

module.exports = Logger;

