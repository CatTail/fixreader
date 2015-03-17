var fs = require('fs');

describe('fixreader', function() {
    var fixtures;
    beforeEach(function() {
        fixtures = require('..')();
    });

    it('should read the content of file', function() {
        fixtures.text.should.equal(read('text.txt'));
    });

    it('should able to read fixture inside directory', function() {
        fixtures.directory.file.should.equal(read('directory/file.txt'));
    });

    it('should able to use complete filename', function() {
        fixtures = require('..')({trim: false});
        fixtures.complete['file.js'].should.equal(read('complete/file.js'));
        fixtures.complete['file.txt'].should.equal(read('complete/file.txt'));
    });

    it('should cache already read files', function() {
        // create temporary file
        var pathname = 'test/fixtures/tmp/file.txt';
        var content = 'hello world';
        fs.writeFileSync(pathname, content, 'utf8');
        fixtures.tmp.file.should.equal(content);
        fs.unlinkSync(pathname);
        // still have the content
        fixtures.tmp.file.should.equal(content);
    });

    it('should support post data process', function() {
        fixtures = require('..')({handler: function(content) {
            return JSON.parse(content);
        }});
        fixtures.handler.should.eql({hello: 'world'});
    });
});

function read(path) {
    return fs.readFileSync('test/fixtures/' + path, 'utf8');
}
