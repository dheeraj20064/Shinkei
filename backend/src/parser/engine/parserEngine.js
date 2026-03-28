const { parseFile }       = require("../parseFile");
const { ParserContext }   = require("./context");
const { createCollector } = require("./collector");

const functionsExtractor = require("../extractors/functions.extractor");
const callsExtractor     = require("../extractors/calls.extractor");
const apiCallsExtractor  = require("../extractors/apiCalls.extractor");
const routesExtractor    = require("../extractors/routes.extractor");
const eventsExtractor    = require("../extractors/events.extractor");
const importsExtractor   = require("../extractors/imports.extractor");

/**
 * parserEngine.js
 *
 * Wires parseFile → extractors → collector.
 * Returns: { file, functions, calls, apiCalls, routes, events, imports }
 */

function runParser(filePath) {
    // 1. parse file → AST
    const ast = parseFile(filePath);
    if (!ast) return null;

    // 2. create context + collector
    const context   = new ParserContext(ast, filePath);
    const collector = createCollector(filePath);

    // 3. run each extractor
    const functions = functionsExtractor.extract(context);
    const calls     = callsExtractor.extract(context);
    const apiCalls  = apiCallsExtractor.extract(context);
    const routes    = routesExtractor.extract(context);
    const events    = eventsExtractor.extract(context);
    const imports   = importsExtractor.extract(context);

    // 4. feed into collector
    functions.forEach(e => collector.addFunction(e));
    calls.forEach(e     => collector.addCall(e));
    apiCalls.forEach(e  => collector.addApiCall(e));
    routes.forEach(e    => collector.addRoute(e));
    events.forEach(e    => collector.addEvent(e));
    imports.forEach(e   => collector.addImport(e));

    // 5. return { file, functions, calls, apiCalls, routes, events, imports }
    return collector.getData();
}

module.exports = { runParser };