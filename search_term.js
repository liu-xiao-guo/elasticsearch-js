// search_term.js

const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

const search = function search(index, body) {
    return client.search({index: index, body: body});
};

module.exports = function searchTerm() {
    let body = {
        size: 4,
        from: 0,
        query: {
            match: {
                city: {
                    query: '北京'
                }
            }
        }
    };

    console.log(`retrieving documents whose twitter matches '${body.query.match.city.query}' (displaying ${body.size} items at a time)...`);
    search('twitter2', body)
        .then(results => {
            console.log(`found ${results.hits.total} items in ${results.took}ms`);
            if (results.hits.total > 0) console.log(`returned twitters:`);
            results.hits.hits.forEach(hit => console.log(hit._source));
        })
        .catch(console.error);
};