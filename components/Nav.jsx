"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
export default function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [hasBeen500Ms, setHasBeen500Ms] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasBeen500Ms(true);
    }, 500);
  }, []);

  useEffect(() => {
    const setProvidersFunction = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setProvidersFunction();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 py-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="Promptopia Logo" className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
            }}
            className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user?.image} width={37} height={37} alt="Profile" className="object-contain rounded-full" />
            </Link>
          </motion.div>
        ) : (
          <>
            {providers &&
              hasBeen500Ms &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}{" "}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              onClick={() => setToggleDropdown((prevState) => !prevState)}
              src={session?.user.image}
              width={37}
              height={37}
              alt="Profile"
              className="object-contain rounded-full cursor-pointer"
            />
            <AnimatePresence>
              {toggleDropdown && (
                <motion.div
                  animate={{ y: 0, opacity: 1 }}
                  initial={{ y: -10, opacity: 0 }}
                  exit={{
                    y: -10,
                    opacity: 0,
                  }}
                  className="dropdown">
                  <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    My Profile
                  </Link>
                  <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            {providers &&
              hasBeen500Ms &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}{" "}
      </div>
    </nav>
  );
}
