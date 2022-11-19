import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

interface NavLink {
  text: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  {
    text: "Buy Orders",
    href: "/buy-orders",
  },
  {
    text: "Datasets",
    href: "/datasets",
  },
];

const Header: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navItems}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={router.pathname === link.href ? styles.active : ""}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
