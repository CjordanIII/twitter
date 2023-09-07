const React = require('react')
const DefaultLayout = require("./layout/Default");

function New(){
return (
  <DefaultLayout >
    <form action={`/api/tweets/${tweet._id}`} method="POST">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required />
      <label htmlFor="author">author</label>
      <input type="text" name="author" required />
      <label htmlFor="body">body</label>
      <textarea name="body" required></textarea>
      <input type="submit" value="Post"></input>
    </form>
  </DefaultLayout>
);
}

module.exports = New