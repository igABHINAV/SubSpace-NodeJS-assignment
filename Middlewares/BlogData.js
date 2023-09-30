const axios = require("axios");
const _ = require("lodash");


const solve = (req) => {
    return req.query.query; 
};

const Memoization = _.memoize(async (req) => {
    const options = {
        method: 'GET',
        headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        },
    };
    const response = await axios('https://intent-kit-16.hasura.app/api/rest/blogs', options);
    const data = await response.data;

    return {
        blogs: _.get(data, 'blogs', []),
    };
}, solve, 60000); 

exports.getBlogData = async (req) => {
    return Memoization(req);
};
