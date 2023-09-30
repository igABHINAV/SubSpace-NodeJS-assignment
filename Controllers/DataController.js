const BlogData = require("../Middlewares/BlogData")
const _ = require("lodash");

exports.processData = async (req, res) => {
    try {
        const { blogs } = await BlogData.getBlogData(req);

        // STATISTICS
        const totalBlogs = _.size(blogs);
        const longtitle = _.maxBy(blogs, 'title.length');
        const privacy = _.filter(blogs, (num) => _.includes(_.toLower(num.title), 'privacy')).length;
        const uniqueBlogTitles = _.uniq(_.map(blogs, 'title'));

        res.status(200).json({
            totalBlogs,
            privacy,
            uniqueBlogTitles,
            longtitle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.Getdata = async (req, res) => {
    try {
        const { blogs } = await BlogData.getBlogData(req);

        const q = req.query.query;

        // SEARCH ALGORITHM USING FILTER FUNCTION
        const ans = _.filter(blogs, blog => _.includes(_.toLower(blog.title), q));
        if (ans.length > 0) {
            res.status(200).json({
                ans
            });
        } else {
            res.status(200).json({
                success: true,
                message: "No results found for the query"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
