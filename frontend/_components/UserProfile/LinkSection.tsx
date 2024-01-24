import { getAllLinks } from '@/app/services/services';
import CreateLinks from './CreateLinks';
import { ILink } from '@/app/types';

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
        </div>
      ))}
      <CreateLinks />
    </div>
  );
}
