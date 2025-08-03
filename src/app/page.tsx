'use client'

import { Button } from '6_shared/ui'
import Link from 'next/link'

export default function HomePage() {

  return (
    <div className="w-full h-svh justify-center items-center flex">
      <div className="mx-auto w-[730px] relative h-[420px] border rounded-3xl shadow-lg overflow-hidden ">
        {/* <Image src="/welcome.jpg" alt="image" fill /> */}
        <div className="absolute left-14 top-16 text-red-400 font-bold text-4xl -space-y-1.5 ">
          <p>Welcome</p>
          <p>to my Program</p>
        </div>
        <Button
          className="absolute left-14 bottom-10"
        >
          <Link href="/auth/login">Please Login</Link>
        </Button>
      </div>
    </div>
  )
}