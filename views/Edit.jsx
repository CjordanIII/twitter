const React = require("react");
const DefaultLayout = require("./layout/Default");
function Edit({ tweet }) {
  return (
    <DefaultLayout>
      <form action={`/api/tweets/${tweet._id}?_method=PUT`} method="POST">
        <label htmlFor="title">Title</label>
        <input type="text" defaultValue={tweet.title} name="title" required />
        <label htmlFor="body">body</label>
        <textarea name="body" defaultValue={tweet.body} required></textarea>
        <input type="checkbox" name="sponsored" defaultChecked={tweet.sponsored}></input>
        <input type="submit" value="Update"></input>
      </form>
    </DefaultLayout>
  );
}

module.exports = Edit;
