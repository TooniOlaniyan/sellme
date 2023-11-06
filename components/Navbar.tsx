import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "@/components/AuthProviders";
import { getCurretUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurretUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Flexible" width={115} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image &&
              (<Image
                className="rounded-full"
                src={session?.user?.image}
                width={40}
                height={40}
                alt={session.user.name}
              />)
            }
            <Link href="/create-project">
              {/* will contain a button to share post */}
              Share post
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
