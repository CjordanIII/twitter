const React = require("react");
const DefaultLayout = require("./layout/Default");

function Index({ tweets }) {
  return (
    <DefaultLayout title="Tweets">
      <nav>
        <a href="/tweets/new"> Create new Tweet</a>
      </nav>
      <ul>
        {/* we going to add a backange so we can do any request we want*/}
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className="border p-5">
              <a href={`/tweets/${tweet._id}`}>{tweet.title}</a>
              <p>{tweet.body}</p>
              <p>{tweet.author}</p>
              <a href={`/api/tweets/add-like/${tweet._id}`}>Like</a>
              <br />
              <span>Likes: {tweet.likes}</span>
              <br />
              <span>{tweet.sponsored ? "sponsored" : ""}</span>
              <br />
              <a href={`/tweets/${tweet._id}/edit`}>Edit tweet</a>
              <form
                method="POST"
                action={`/api/tweets/${tweet._id}?_method=DELETE`}
              >
                <input type="submit" value="Delete" />
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}

module.exports = Index