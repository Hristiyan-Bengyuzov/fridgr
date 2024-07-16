import NavTogglerProps from "../../types/Navbar/NavbarProps";

export default function NavToggler({ expanded, setExpanded }: NavTogglerProps) {
  return (
    <button
      className={`navbar-toggler ${!expanded ? "collapsed" : ""}`}
      type="button"
      aria-controls="responsive-navbar-nav"
      aria-label="Toggle navigation"
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
