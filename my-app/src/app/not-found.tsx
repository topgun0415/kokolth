import { Error } from '@/components/organisms/Error';
import Footer from '@/components/organisms/Footer';

export default function NotFound() {
  return (
    <>
      <Error status={'404'} />
      <Footer />
    </>
  );
}
