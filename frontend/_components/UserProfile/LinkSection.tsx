import { getAllLinks } from '@/app/services/services';
import CreateLinks from './CreateLinks';
import { ILink } from '@/app/types';
import DeleteLink from './DeleteLink';

type Props = {
  userId: string;
};

export default async function LinkSection({ userId }: Props) {
        const links = await getAllLinks(userId);

  return (
    <div>
      {links.map((link:ILink) => (
        <div key={link.linkId}>
          <h1>{link.title}</h1>
          <DeleteLink id={link.linkId!}/>
        </div>
      ))}
      <CreateLinks />
    </div>
  );
}
