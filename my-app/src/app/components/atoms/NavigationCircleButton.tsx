import Link from 'next/link';
import Image from 'next/image';

interface NavCircleButtonProps {
  icon: string;
  link: string;
  width: number;
  height: number;
  altText?: string;
}

const NavCircleButton: React.FC<NavCircleButtonProps> = ({
  icon,
  link,
  width,
  height,
  altText = 'Navigation icon',
}) => {
  return (
    <>
      <Link href={link} aria-label={altText}>
        <button className='w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-white hover:bg-gray-300 cursor-pointer transition'>
          <Image src={icon} alt={altText} width={width} height={height} />
        </button>
      </Link>
    </>
  );
};

export default NavCircleButton;
