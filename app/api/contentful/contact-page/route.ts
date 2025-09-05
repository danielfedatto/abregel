import { NextResponse } from 'next/server';
import { createClient } from 'contentful';
import { ContactPage } from '@/types/contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: '6RLu9FMBw2SudnmlgBl5qf',
      order: ['fields.order'],
      limit: 1,
    });

    if (response.items.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma página de contato encontrada' },
        { status: 404 }
      );
    }

    const contactPage = response.items[0];
    
    return NextResponse.json(contactPage, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('Erro ao buscar página de contato:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
