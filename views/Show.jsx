const React = require('react')
const DefaultLayout = require("./layout/Default");




function Show({tweet}){
    return (
      <DefaultLayout>
        <div>{tweet.title}</div>
        <div>{tweet.author}</div>
        <div>{tweet.body}</div>
        <div>{tweet.sponsored ? "sponsored" : ""}</div>
        <div>{new Date(tweet.createdAt).toISOString()}</div>

        {/* Comments Mapping */}
        <div>
          {tweet.comments.length >1  &&
            tweet.comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <div>{comment.body}</div>
                  <div>{comment.author}</div>
                </div>
              );
            })}
        </div>

        <div>
          <form
            method="POST"
            action={`/api/tweets/add-comment/${tweet._id}?_method=PUT`}
          >
            comment: <input type="text" name="body" required />
            <br />
            author: <input type="text" name="author" required />
            <input type="submit" name="Add" required />
          </form>
        </div>
      </DefaultLayout>
    );
}

module.exports = Show