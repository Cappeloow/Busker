import { getAllLinks } from '@/app/services/services';
import CreateLinks from './CreateLinks';
import { ILink } from '@/app/types';
import DeleteLink from './DeleteLink';

type Props = {
  userId: string;
  isAuth: string;
};

export default async function LinkSection({ userId, isAuth }: Props) {
        const links = await getAllLinks(userId);

  return (
    <div>
      {links.map((link:ILink) => (
        <div key={link.linkId}>
          <h1>{link.title}</h1>
          { isAuth === userId && <DeleteLink id={link.linkId!}/>}
        </div>
      ))}
      <CreateLinks isAuth={isAuth} />
    </div>
  );
}
