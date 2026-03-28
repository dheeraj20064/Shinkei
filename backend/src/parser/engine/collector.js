

/**
 * collector.js
 * PURE STORAGE LAYER — no traversal, no logic.
 */

function createCollector(filePath) {
    const data = {
        file:      filePath,
        functions: [],
        calls:     [],
        apiCalls:  [],
        routes:    [],
        events:    [],
        imports:   [],
    };

    return {
        addFunction(entry) { data.functions.push({ ...entry, file: filePath }); },
        addCall(entry)     { data.calls.push({ ...entry, file: filePath }); },
        addApiCall(entry)  { data.apiCalls.push({ ...entry, file: filePath }); },
        addRoute(entry)    { data.routes.push({ ...entry, file: filePath }); },
        addEvent(entry)    { data.events.push({ ...entry, file: filePath }); },
        addImport(entry)   { data.imports.push({ ...entry, file: filePath }); },
        getData()          { return data; },
    };
}

module.exports = { createCollector };