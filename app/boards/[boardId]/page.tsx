import { notFound } from 'next/navigation';
import { Proposition } from '~/src/components/proposition/PropositionLine';
import { prisma } from '~/src/db/prisma';
import { PropositionForm } from './propositionForm';


export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
   const boardId = Number(params.boardId);

const propositions = await prisma.proposition.findMany({
  where: {
    boardId: boardId,
  },
  orderBy: {
    vote:{
      _count :'desc',
    }
  },
select: {
    title: true,
    id : true,
    _count: {
      select:{
        vote :true,
      },
    },
  },
});
  return (
    <div className="flex flex-col gap-6">
      <PropositionForm boardId={boardId} />
      <ul className='flex flex-col gap-4'>
    {propositions.map((proposition) =>(
      <Proposition 
      key={proposition.id} 
      voteCount={proposition._count.vote} 
      {...proposition}
      />
      ))}
      </ul>
    </div>
  );
}
 