import { Link } from "gatsby";

export default function Header({ location, name }) {
  return (
    <div className="header">
      <Link style={{ color: "white", textDecoration: "none" }} to={location}>
        {name}
      </Link>
    </div>
  );
}
