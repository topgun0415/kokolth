import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          src='/image/docker.png'
          alt='Vercel Logo'
          width={500}
          height={500}
          layout='fixed'></Image>
        <h1>Hello world!</h1>
        <h2>this is practice of Docker image</h2>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
    </div>
  );
}
