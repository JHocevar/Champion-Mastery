import Header from "../components/Header";

export default function about() {
  return (
    <>
      <Header location="/" name="home" />
      <div className="content">
        <h1>About</h1>
        <p>
          This was a fun project I created to refresh my skills on React and to
          learn Gatsby and Netlify. I had previously created champion mastery
          graph utilities in python, but this website allows the project be more
          portable and user friendly!
        </p>
        <br />
        <p>
          Checkout the source code at my github page{" "}
          <a href="https://github.com/JHocevar/Champion-Mastery">here</a>!
        </p>
      </div>
    </>
  );
}
