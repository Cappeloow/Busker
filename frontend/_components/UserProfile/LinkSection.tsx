import { getAllLinks } from '@/app/services/services';
import CreateLinks from './CreateLinks';
import { ILink } from '@/app/types';
import LinkComponent from './LinkComponent';
type Props = {
  userId: string;
  isAuth: string;
};

export default async function LinkSection({ userId, isAuth }: Props) {
        const links = await getAllLinks(userId);

  return (
    <div className='linkSection'>
      <CreateLinks isAuth={isAuth} />
      {links.map((link:ILink) => (
                <div key={link.linkId} className='link_component'>
      <LinkComponent isAuth={isAuth} userId={userId} link={link}/>
      </div>
      ))}
    </div>
  );
}
