import { Link, Navbar, NavbarBrand } from "@nextui-org/react";

export default function AppNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
      <Link color="primary" href="/">
        <p className="text-xl font-bold text-inherit">Akakçe</p>
      </Link>
      </NavbarBrand>
    </Navbar>
  );
}