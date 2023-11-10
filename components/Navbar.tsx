import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "@/components/AuthProviders";
import { getCurrentUser } from "@/lib/session";
import {signOut} from 'next-auth/react'
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
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
            {session?.user?.image && (
              // <Link href={`/profile/${session?.user?.id}`}>
              //   <Image
              //     className="rounded-full"
              //     src={session?.user.image}
              //     width={40}
              //     height={40}
              //     alt={session.user.name}
              //   />
              // </Link>
              <ProfileMenu session = {session} />
            )}
            <Link href="/create-project">
              {/* will contain a button to share post */}
              Share post
            </Link>
            {/* <button className="text-sm" type="button" onClick={signOut}></button> */}
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
