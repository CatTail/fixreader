var fs = require('fs');
var path = require('path');
var debug = require('debug')('fixreader');

/**
 * options
 * {
 *     path: fixture directory path, default to "test/fixtures"
 *     trim: whether to trim fixture extension, default to true
 * }
 */
module.exports = function(options) {
    options = options || {};
    options.path = options.path === undefined ? 'test/fixtures' : options.path;
    options.trim = options.trim === undefined ? true : options.trim;
    debug('options', options);

    return proxy(options.path, {}, options);
};

function proxy(prefix, obj, options) {
    debug('prefix', prefix);
    fs.readdirSync(prefix)
        .forEach(function(filename) {
            var pathname = path.join(prefix, filename);
            var key = options.trim ? path.basename(filename, path.extname(filename)) : filename;
            var stat = fs.statSync(pathname);
            var descriptor = {};
            var cache;

            if (stat.isFile()) {
                descriptor.get = function() {
                    if (!cache) {
                        cache = fs.readFileSync(pathname, 'utf8');
                        debug('read file', pathname, cache);
                    }
                    return cache;
                };
            } else {
                descriptor.get = function() {
                    if (!cache) {
                        cache = {};
                        cache = proxy(pathname, cache, options);
                    }
                    return cache;
                };
            }
            Object.defineProperty(obj, key, descriptor);
        });
    return obj;
}
